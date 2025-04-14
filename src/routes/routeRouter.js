import {Router} from "express";
import routeController from "../controllers/routeController.js" // default

const router = Router();

// rutas más específicas primero
router.get("/",routeController.getAll)
router.get("/create", routeController.createForm);
router.post("/", routeController.create);

// rutas con parámetros compuestos
router.get("/:id/edit", routeController.editForm);
router.post("/:id", routeController.edit);
router.post("/:id/delete", routeController.remove);
// ruta con parámetro simple al final
router.get("/:id", routeController.getByID);

export default router;