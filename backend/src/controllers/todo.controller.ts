import { celebrate, Joi } from "celebrate";
import {
    SOMETHING_WENT_WRONG,
    SUCCESS,
    UNAUTHORIZED_REQUEST,
} from "../utils/message.util";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import db from "../services/db.service";

export const createTodo = {
    validator: celebrate({
        body: Joi.object({
            title: Joi.string().required(),
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

            // Create todo
            const { title } = req.body;
            const now = new Date();
            const todo = await db.todo.create({
                data: {
                    userId: req.user.id,
                    date: now.getDate(),
                    month: now.getMonth() + 1,
                    year: now.getFullYear(),
                    title: title,
                },
                select: {
                    id: true,
                    title: true,
                    date: true,
                    month: true,
                    year: true,
                    is_done: true,
                },
            });

            res.status(200).json({
                code: 200,
                message: SUCCESS,
                data: todo,
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};
