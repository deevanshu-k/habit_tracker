import { Router } from "express";
import { createTodo } from "../controllers/todo.controller";
const router = Router();

router.get("/", (req, res) => {});
router.get("/today", (req, res) => {});
router.post("/", createTodo.validator, createTodo.controller);
router.patch("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

export default router;
