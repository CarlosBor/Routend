import { Router } from "express";
import authController from "../controllers/authController.js";
import { isAdmin, isLoggedIn, isNotLoggedIn } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/login", isNotLoggedIn, authController.loginForm)
router.get("/register", authController.registerForm);

router.post("/register", authController.register);
router.post("/login", isNotLoggedIn, authController.login);

router.get("/logout", isLoggedIn, authController.logout);

export default router;