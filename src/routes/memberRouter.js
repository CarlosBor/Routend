import {Router} from "express";
import memberController from "../controllers/memberController.js" // default

const router = Router();

// path más específicas primero
router.get("/",memberController.getAll)
// router.get("/create", memberController.createForm);
//router.post("/", memberController.create);

// path con parámetros compuestos
router.get("/:id/edit", memberController.editForm);
router.post("/:id", memberController.edit);
router.post("/:id/delete", memberController.remove);

// path con parámetro simple al final
router.get("/:id", memberController.getByID);

export default router;