import { Router } from "express";
import { authRouter } from "./authRoutes.mjs";


const router = Router();

router.use("/auth",authRouter)

export const mainRouter = router;