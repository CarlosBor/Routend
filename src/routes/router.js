import { Router } from "express";
import routeRouter from "./routeRouter.js";
import memberRouter from "./memberRouter.js";
import authRouter from "./authRouter.js";


const router = Router();

// router.get("/",(req,res)=>{
//     res.send("hello world");
//     console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
// });

router.get("/", (req, res) => {
    // const isLoggedIn = !!req.session.member;
    const message = req.query.message || null;

    res.render("home", {
        // isLoggedIn,
        // member: req.session.member,
        message 
    });
});

router.use("/route", routeRouter);
router.use("/member", memberRouter);
router.use("/auth", authRouter);



export default router;

