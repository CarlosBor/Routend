import {Router} from "express";
import routeController from "../controllers/routeController.js" // default
import {isAdmin} from "../middlewares/authMiddleware.js";

const router = Router();

// rutas más específicas primero
router.get("/",routeController.getAll)
router.get("/create", isAdmin, routeController.createForm);
router.post("/", isAdmin,routeController.create);

// rutas con parámetros compuestos
router.get("/:id/edit", isAdmin,routeController.editForm);
router.post("/:id", isAdmin,routeController.edit);
router.post("/:id/delete", isAdmin,routeController.remove);

// ruta con parámetro simple al final
router.get("/:id", routeController.getByID);

export default router;