import { Router } from "express";
import { Sequelize } from "sequelize";
// import standRouter from "./standRouter.js";
 import funcionLaQueSea from "./routerLoQueSea.js";
// import authRouter from "./authRouter.js";

const router = Router();

router.get("/",(req,res)=>{
    res.send("hello world");
})
router.use("/test",funcionLaQueSea);
// router.use("/product",productRouter);
// router.use("/",authRouter);

export default router