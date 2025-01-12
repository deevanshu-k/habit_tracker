import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {});
router.post("/", (req, res) => {});
router.patch("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});
router.get("/:id/logs", (req, res) => {}); // ?month={}&year={}
router.get("/today", (req, res) => {});

export default router;
