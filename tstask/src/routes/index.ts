import { Router } from "express";
import {authRouter} from "./authRoutes"


const router: Router = Router();
router.use("/auth", authRouter);

export const mainRouter: Router = router;