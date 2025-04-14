import {Router} from "express";
import memberController from "../controllers/memberController.js" // default
import authController from "../controllers/authController.js"
import { isAdmin, isLoggedIn, isNotLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

// path más específicas primero
router.get("/",isAdmin,memberController.getAll)
router.get("/create", isAdmin, authController.registerForm);
//router.post("/", memberController.create);

// path con parámetros compuestos
router.get("/:id/edit", isAdmin, memberController.editForm);
router.post("/:id", isAdmin, memberController.edit);
router.post("/:id/delete", isAdmin, memberController.remove);

// path con parámetro simple al final
router.get("/:id", isAdmin, memberController.getByID);

export default router;