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

export const getTodayTodos = {
    validator: celebrate({
        body: {},
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

            // Get all todays todos
            const now = new Date();
            const todos = await db.todo.findMany({
                where: {
                    userId: req.user.id,
                    date: now.getDate(),
                    month: now.getMonth() + 1,
                    year: now.getFullYear(),
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
                data: todos,
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};

export const updateTodo = {
    validator: celebrate({
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            title: Joi.string().required(),
            is_done: Joi.bool().required(),
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

            // Update todo
            const { id } = req.params;
            const { title, is_done } = req.body;
            const todo = await db.todo.update({
                where: {
                    id: id,
                    userId: req.user.id,
                },
                data: {
                    title: title,
                    is_done: is_done,
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

export const deleteTodo = {
    validator: celebrate({
        params: Joi.object({
            id: Joi.string().required(),
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

            // Delete todo
            const { id } = req.params;
            const todo = await db.todo.delete({
                where: {
                    userId: req.user.id,
                    id: id,
                },
                select: {
                    id: true,
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
