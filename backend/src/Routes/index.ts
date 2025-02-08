import { Router } from "express";
import authRouter from "./auth.route";
import habitRouter from "./habit.route";
import todoRouter from "./todo.route";
import userRouter from "./user.route";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/habit", authMiddleware, habitRouter);
router.use("/todo", authMiddleware, todoRouter);
router.use("/user", authMiddleware, userRouter);

export default router;
