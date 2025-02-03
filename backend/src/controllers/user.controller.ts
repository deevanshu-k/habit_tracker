import { celebrate, Joi } from "celebrate";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { SOMETHING_WENT_WRONG, UNAUTHORIZED_REQUEST } from "../utils/message.util";
import db from "../services/db.service";

export const getUser = {
    validator: celebrate({
        cookies: Joi.object({
            auth: Joi.string().required(),
        }),
    }),
    controller: async (req: AuthenticatedRequest, res: Response) => {
        try {
            if (!req.user) {
                res.json({
                    code: 401,
                    message: UNAUTHORIZED_REQUEST,
                });
                return;
            }
            // Find user
            const { id } = req.user;
            const user = await db.user.findFirst({ where: { id } });
            if (!user) {
                res.json({
                    code: 404,
                    message: "User not found!",
                });
                return;
            }
            res.status(200).json({
                code: 200,
                message: "Success",
                data: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    mode: user.mode,
                },
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};
