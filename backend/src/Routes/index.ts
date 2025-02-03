import { Router } from "express";
import authRouter from "./auth.route";
import habitRouter from "./habit.route";
import todoRouter from "./todo.route";
import userRouter from "./user.route";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/habit", habitRouter);
router.use("/todo", todoRouter);
router.use("/user", authMiddleware, userRouter);

export default router;
