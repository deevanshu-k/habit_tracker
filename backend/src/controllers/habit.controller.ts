import { celebrate, Joi } from "celebrate";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
    NOT_FOUND,
    SOMETHING_WENT_WRONG,
    SUCCESS,
    UNAUTHORIZED_REQUEST,
} from "../utils/message.util";
import db from "../services/db.service";
import { Color, FrequencyType } from "@prisma/client";

export const createHabit = {
    validator: celebrate({
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().allow(""),
            color: Joi.string().optional(),
            f_type: Joi.string()
                .valid(
                    "FIXED_DAYS",
                    "NO_OF_DAYS_IN_WEEKS",
                    "NO_OF_DAYS_IN_MONTHS"
                )
                .required(),
            f: Joi.alternatives().conditional("f_type", [
                {
                    is: "FIXED_DAYS",
                    then: Joi.string()
                        .length(7)
                        .pattern(/^[01]{7}$/)
                        .required(),
                },
                {
                    is: "NO_OF_DAYS_IN_WEEKS",
                    then: Joi.string()
                        .length(1)
                        .pattern(/^[1-7]$/)
                        .required(),
                },
                {
                    is: "NO_OF_DAYS_IN_MONTHS",
                    then: Joi.string()
                        .pattern(/^([1-9]|[12][0-9]|30)$/) // Matches numbers 1-30
                        .required(),
                },
            ]),
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

            // Create Habit
            const { title, description, color, f_type, f } = req.body;
            const habit = await db.habit.create({
                data: {
                    title: String(title),
                    description: String(description),
                    frequency_type:
                        f_type === FrequencyType.FIXED_DAYS
                            ? FrequencyType.FIXED_DAYS
                            : f_type === FrequencyType.NO_OF_DAYS_IN_MONTHS
                            ? FrequencyType.NO_OF_DAYS_IN_MONTHS
                            : FrequencyType.NO_OF_DAYS_IN_WEEKS,
                    frequency: Number(f),
                    color: color,
                    userId: req.user.id,
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    frequency_type: true,
                    frequency: true,
                    color: true,
                },
            });

            res.status(200).json({
                code: 200,
                message: SUCCESS,
                data: habit,
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};
export const getTodayHabits = {
    validator: celebrate({
        body: {},
    }),
    controller: async (req: Request, res: Response) => {},
};
export const getHabits = {
    validator: celebrate({
        body: {},
    }),
    controller: async (req: Request, res: Response) => {},
};
export const updateHabit = {
    validator: celebrate({
        body: {},
    }),
    controller: async (req: Request, res: Response) => {},
};
export const deleteHabit = {
    validator: celebrate({
        body: {},
    }),
    controller: async (req: Request, res: Response) => {},
};
export const updateHabitLog = {
    validator: celebrate({
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            date: Joi.number().min(1).max(31).required(),
            month: Joi.number().min(1).max(12).required(),
            year: Joi.number().min(2000).max(4000).required(),
            is_done: Joi.boolean().required(),
            note: Joi.string().allow("").required(),
        }),
    }),
    controller: async (req: Request, res: Response) => {
        try {
            
        } catch (error) {
            
        }
    },
};
