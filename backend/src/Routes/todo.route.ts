import { Router } from "express";
import {
    createTodo,
    getTodayTodos,
    updateTodo,
} from "../controllers/todo.controller";
const router = Router();

router.get("/", (req, res) => {});
router.get("/today", getTodayTodos.validator, getTodayTodos.controller);
router.post("/", createTodo.validator, createTodo.controller);
router.put("/:id", updateTodo.validator, updateTodo.controller);
router.delete("/:id", (req, res) => {});

export default router;
