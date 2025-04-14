import { Router } from "express";
import routeRouter from "./routeRouter.js";
import memberRouter from "./memberRouter.js";
import authRouter from "./authRouter.js";


const router = Router();

router.get("/", (req, res) => {
    const message = req.query.message || null;
    const error = req.query.error || null;
    console.log("message: ", message);
    console.log("error: ", error);
    res.render("home", {
        message, error 
    });
});

router.use("/route", routeRouter);
router.use("/member", memberRouter);
router.use("/auth", authRouter);



export default router;

