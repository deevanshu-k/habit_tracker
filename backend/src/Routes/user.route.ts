import { Router } from "express";
import { getUser } from "../controllers/user.controller";
const router = Router();

router.get("/", getUser.controller);
router.patch("/", (req, res) => {});
router.post("/profileimage", (req, res) => {});

export default router;
