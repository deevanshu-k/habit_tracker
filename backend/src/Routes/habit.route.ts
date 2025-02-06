import { Router } from "express";
import {
    createHabit,
    deleteHabit,
    getHabits,
    getTodayHabits,
    updateHabit,
    updateHabitLog,
} from "../controllers/habit.controller";
const router = Router();

router.post("/", createHabit.validator, createHabit.controller);
router.get("/", getHabits.validator, getHabits.controller);
router.get("/today", getTodayHabits.validator, getTodayHabits.controller);
router.put("/:id", updateHabit.validator, updateHabit.controller);
router.delete("/:id", deleteHabit.validator, deleteHabit.controller);
router.put("/:id/log", updateHabitLog.validator, updateHabitLog.controller); // ?month={}&year={}

export default router;
