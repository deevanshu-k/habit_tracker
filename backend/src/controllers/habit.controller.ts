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
import { FrequencyType } from "@prisma/client";

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
                    frequency: String(f),
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
    controller: async (req: AuthenticatedRequest, res: Response) => {
        try {
            if (!req.user) {
                res.json({
                    code: 401,
                    message: UNAUTHORIZED_REQUEST,
                });
                return;
            }

            // Get all habits
            const habits = await db.habit.findMany({
                where: {
                    userId: req.user.id,
                    is_archived: false,
                    is_deleted: false,
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    color: true,
                },
            });

            // Get todays logs for habits
            const now = new Date();
            const logs = await db.habitLog.findMany({
                where: {
                    habitId: { in: habits.map((h) => h.id) },
                    date: now.getDate(),
                    month: now.getMonth() + 1,
                    year: now.getFullYear(),
                },
            });

            // Create habit to is_done map
            const logMap = new Map(
                logs.map((log) => [
                    log.habitId,
                    { is_done: log.is_done, note: log.note },
                ])
            );

            // Create response for all habit data with is_done attribute
            const resData = habits.map((habit) => ({
                ...habit,
                is_done: logMap.has(habit.id)
                    ? logMap.get(habit.id)?.is_done
                    : false,
                note: logMap.has(habit.id) ? logMap.get(habit.id)?.note : "",
            }));

            res.status(200).json({
                code: 200,
                message: SUCCESS,
                data: resData,
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};
export const getHabits = {
    validator: celebrate({
        query: Joi.object({
            month: Joi.number().min(1).max(12).required(),
            year: Joi.number().min(2000).max(4000).required(),
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

            const { month, year } = req.query;
            const habits = await db.habit.findMany({
                where: {
                    userId: req.user.id,
                    is_archived: false,
                    is_deleted: false,
                },
                include: {
                    logs: {
                        where: {
                            month: Number(month),
                            year: Number(year),
                        },
                        omit: {
                            habitId: true,
                            month: true,
                            year: true,
                        },
                    },
                },
                omit: {
                    userId: true,
                },
            });
            const habitsData = habits.map((h) => {
                const logArr: {
                    id: string;
                    date: number;
                    is_done: boolean;
                    note: string;
                }[] = Array.from({ length: 31 }, (v, k) => ({
                    id: "",
                    date: k + 1,
                    is_done: false,
                    note: "",
                }));

                h.logs.forEach((l) => {
                    logArr[l.date - 1] = l;
                });

                return { ...h, logs: logArr };
            });

            res.status(200).json({
                code: 200,
                message: SUCCESS,
                data: habitsData,
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};
export const updateHabit = {
    validator: celebrate({
        body: {},
    }),
    controller: async (req: Request, res: Response) => {},
};
export const deleteHabit = {
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

            // Delete habit
            const { id } = req.params;
            const habit = await db.habit.update({
                where: {
                    id: id,
                    userId: req.user.id,
                },
                data: {
                    is_deleted: true,
                },
                select: {
                    id: true,
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
    controller: async (req: AuthenticatedRequest, res: Response) => {
        try {
            if (!req.user) {
                res.json({
                    code: 401,
                    message: UNAUTHORIZED_REQUEST,
                });
                return;
            }

            const { id } = req.params;
            const { date, month, year, is_done, note } = req.body;

            // Habit ownership check
            const habit = await db.habit.findFirst({
                where: { id, userId: req.user.id },
            });
            if (!habit) {
                res.json({
                    code: 401,
                    message: UNAUTHORIZED_REQUEST,
                });
                return;
            }

            // Update or create habit log
            const log = await db.habitLog.upsert({
                create: {
                    date,
                    month,
                    year,
                    habitId: id,
                    is_done,
                    note,
                },
                update: {
                    is_done,
                    note,
                },
                select: {
                    id: true,
                    is_done: true,
                    note: true,
                },
                where: {
                    habitId_date_month_year: {
                        habitId: String(id),
                        date: Number(date),
                        month: Number(month),
                        year: Number(year),
                    },
                },
            });

            res.status(200).json({
                code: 200,
                message: SUCCESS,
                data: log,
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: SOMETHING_WENT_WRONG,
            });
        }
    },
};
