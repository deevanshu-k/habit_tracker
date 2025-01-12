import { Router } from "express";
import authRouter from "./auth.route";
import habitRouter from "./habit.route";
import todoRouter from "./todo.route";
import userRouter from "./user.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/habit", habitRouter);
router.use("/todo", todoRouter);
router.use("/user", userRouter);

export default router;
