import { Router } from "express";
import authController from "../controllers/authController.js";
const router = Router();

// router.get("/login",authController.loginForm)
router.get("/register",authController.registerForm);

router.post("/register",authController.register);
// router.post("/login",authController.login);

// router.get("/logout",authController.logout);

export default router;