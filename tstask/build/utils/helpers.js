"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserJWT = exports.generateUserJWT = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltRounds = 10;
const JWTSecret = "VerySecretKey";
const hashPassword = (password) => {
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    return bcrypt_1.default.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
const comparePassword = (plain, hashed) => {
    return bcrypt_1.default.compareSync(plain, hashed);
};
exports.comparePassword = comparePassword;
const generateUserJWT = (user) => {
    const payload = {
        userId: user.id,
        username: user.username
    };
    return jsonwebtoken_1.default.sign(payload, JWTSecret);
};
exports.generateUserJWT = generateUserJWT;
const verifyUserJWT = (token) => {
    try {
        const validatedTokenData = jsonwebtoken_1.default.verify(token, JWTSecret);
        if (typeof validatedTokenData == "string") {
            throw new Error("an error happened while parsing user token");
        }
        return validatedTokenData;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.verifyUserJWT = verifyUserJWT;
