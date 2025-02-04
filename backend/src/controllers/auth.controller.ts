import { celebrate, Joi } from "celebrate";
import { Request, Response } from "express";
import db from "../services/db.service";
import { generateOTP } from "../services/otp.service";
import { otpSignUpCacheManager } from "../services/cache.service";
import { sendMail } from "../services/mail.service";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {
    LOGOUT_SUCCESS,
    MAIL_SENT_OTP_FOR_SIGNUP,
    OTP_EXPIRED,
    SOMETHING_WENT_WRONG,
    USER_WITH_THIS_EMAIL_ALREADY_EXIST,
    WELCOME,
    WRONG_EMAIL_OR_PASSWORD,
    WRONG_OTP,
} from "../utils/message.util";

export const localSignUp = {
    validator: celebrate({
        body: Joi.object().keys({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string()
                .min(10)
                .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^+=_]).+$/)
                .required()
                .messages({
                    "string.min":
                        "Password must be at least 10 characters long.",
                    "string.pattern.base":
                        "Password must contain alphabets, numbers, and at least one special character.",
                    "string.empty": "Password is required.",
                }),
        }),
    }),
    controller: async (req: Request, res: Response) => {
        try {
            const { first_name, last_name, email, password } = req.body;

            // Check if user already exist
            let user = await db.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (user) {
                res.status(409).json({
                    code: 409,
                    message: USER_WITH_THIS_EMAIL_ALREADY_EXIST,
                });
                return;
            }

            // Generate OTP and save it to local cache for 120 Second
            const otp = generateOTP(6);
            otpSignUpCacheManager.set(
                email,
                {
                    first_name: String(first_name),
                    last_name: String(last_name),
                    email: String(email),
                    password: String(password),
                    otp: otp,
                },
                120 * 1000
            );

            // Send mail
            await sendMail(String(email), "Register for otp.", `OTP: ${otp}`);

            res.status(200).json({
                code: 200,
                message: MAIL_SENT_OTP_FOR_SIGNUP,
            });
        } catch (error) {
            res.json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};

export const localSignUpVerifyByOTP = {
    validator: celebrate({
        body: Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().length(6).required(),
        }),
    }),
    controller: async (req: Request, res: Response) => {
        try {
            const { email, otp } = req.body;

            // Check if user already exist
            let user = await db.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (user) {
                res.status(409).json({
                    code: 409,
                    message: USER_WITH_THIS_EMAIL_ALREADY_EXIST,
                });
                return;
            }

            // Check otp expiration
            const cacheEntry = otpSignUpCacheManager.get(email);
            if (!cacheEntry) {
                res.status(409).json({
                    code: 500,
                    message: OTP_EXPIRED,
                });
                return;
            }

            // Compare otp
            if (cacheEntry.otp !== otp) {
                res.status(409).json({
                    code: 409,
                    message: WRONG_OTP,
                });
                return;
            }

            // Create password hash with hash salt
            const salt_rounds = 10;
            const salt = await bcrypt.genSalt(salt_rounds);
            const hashed_password = await bcrypt.hash(
                cacheEntry.password,
                salt
            );

            // Save user
            await db.user.create({
                data: {
                    email,
                    first_name: cacheEntry.first_name,
                    last_name: cacheEntry.last_name,
                    pswd_hash: hashed_password,
                    pswd_hash_salt: salt,
                },
            });

            // Remove user signup cache
            otpSignUpCacheManager.delete(email);

            // Send welcome mail
            await sendMail(
                String(email),
                "Welcome to habit tracker",
                `Welcome ${cacheEntry.first_name} ${cacheEntry.last_name}`
            );

            res.status(200).json({
                code: 200,
                message: WELCOME,
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};

export const localSignIn = {
    validator: celebrate({
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),

    controller: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            // Get user
            let user = await db.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (!user) {
                res.status(401).json({
                    code: 401,
                    message: WRONG_EMAIL_OR_PASSWORD,
                });
                return;
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.pswd_hash);
            if (!isMatch) {
                res.status(401).json({
                    code: 401,
                    message: WRONG_EMAIL_OR_PASSWORD,
                });
                return;
            }

            // Generate Token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
                String(process.env.JWT_SECRET),
                {
                    expiresIn: "1h",
                }
            );

            // Set token to cookie
            res.cookie("auth", token, {
                httpOnly: true, // Prevents access via JavaScript
                secure: false, // Set to true for HTTPS
                sameSite: "lax", // 'None' if cross-origin; 'Lax' is fine for localhost
            });

            res.status(200).json({
                code: 200,
                message: WELCOME,
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};

export const signOut = {
    controller: async (req: Request, res: Response) => {
        res.clearCookie("auth", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.status(200).json({ code: 200, message: LOGOUT_SUCCESS });
    },
};
