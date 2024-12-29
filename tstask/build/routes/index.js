"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const authRoutes_1 = require("./authRoutes");
const router = (0, express_1.Router)();
router.use("/auth", authRoutes_1.authRouter);
exports.mainRouter = router;
