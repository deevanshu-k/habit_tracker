import { Router } from "express";
import { localSignUp } from "../controllers/auth.controller";
const router = Router();

router.post("/local/signup", localSignUp.validator, localSignUp.controller);
router.post("/local/signin", (req, res) => {});
router.post("/local/forgot_pswd", (req, res) => {});
router.post("/local/forgot_pswd/check_otp", (req, res) => {});

router.post("/google/signup", (req, res) => {});
router.post("/google/signin", (req, res) => {});
router.post("/google/validate", (req, res) => {});

export default router;
