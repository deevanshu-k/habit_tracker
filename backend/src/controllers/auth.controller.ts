import { celebrate, Joi } from "celebrate";
import { Request, Response } from "express";
import db from "../services/db.service";
import { generateOTP } from "../services/otp.service";
import { otpSignUpCacheManager } from "../services/cache.service";
import { sendMail } from "../services/mail.service";

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
                    message: "User with this email already exist!",
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
                messsage: "Mail is send to your email!",
            });
        } catch (error) {
            res.json({
                code: 500,
                message: "Something went wrong!",
            });
        }
    },
};
