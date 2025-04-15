import {Router} from "express";
import tripController from "../controllers/tripController.js" // default
import {isAdmin, isLoggedIn} from "../middlewares/authMiddleware.js";
const router = Router();

// poner las rutas más específicas primero
router.get("/", isLoggedIn, tripController.getAll);
router.get("/create", isAdmin, tripController.createForm);
router.post("/", isAdmin,tripController.create);
router.post("/signup", isLoggedIn, tripController.signUp);
router.post("/unsubscribe", isLoggedIn, tripController.unsubscribe);

// poner las rutas con parametros compuestos en medio
router.get("/:id/edit", isAdmin,tripController.editForm);
router.post("/:id", isAdmin,tripController.edit);
router.post("/:id/delete", isAdmin,tripController.remove);

// poner rutas con parámetros simples al final
router.get("/:id", isLoggedIn, tripController.getByID);



export default router;