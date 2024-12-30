"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../mongoose/schemas/user");
const helpers_1 = require("../utils/helpers");
const validationSchema_1 = require("../utils/validationSchema");
const passport_1 = __importDefault(require("passport"));
;
const router = (0, express_1.Router)();
router.post("/signup", (0, express_validator_1.checkSchema)(validationSchema_1.createUserValidationSchema), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(request);
    if (!results.isEmpty()) {
        response.status(400).send(results.array());
    }
    const data = (0, express_validator_1.matchedData)(request);
    data.password = (0, helpers_1.hashPassword)(data.password);
    const newUser = new user_1.User(data);
    try {
        const savedUser = yield newUser.save();
        response.status(201).send(savedUser);
    }
    catch (err) {
        console.log(err);
        response.sendStatus(400);
    }
}));
router.post("/login", (0, express_validator_1.checkSchema)(validationSchema_1.createUserValidationSchema), (request, response, next) => {
    const results = (0, express_validator_1.validationResult)(request);
    if (!results.isEmpty()) {
        response.status(400).send(results.array());
    }
    next(); // Proceed to the next middleware
}, passport_1.default.authenticate("local"), (request, response) => {
    response.sendStatus(200);
});
router.get("/status", (request, response) => {
    var _a;
    console.log("inside the status endpoint");
    response.status(200).send((_a = request.session.passport) === null || _a === void 0 ? void 0 : _a.user);
});
router.post("/logout", (request, response) => {
    // logout using passport
    request.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            response.status(500).send({ error: "Failed to log out" });
        }
        console.log("proceeding to destroy the session - request.logout() failed-");
        request.session.destroy((destroyErr) => {
            if (destroyErr) {
                console.error("Session destruction error:", destroyErr);
                response.status(500).send({ error: "Failed to destroy session" });
            }
            response.status(200).send({ message: "Logged out successfully" });
        });
    });
});
exports.authRouter = router;
