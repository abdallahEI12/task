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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_1 = require("../mongoose/schemas/user");
const helpers_1 = require("../utils/helpers");
passport_1.default.serializeUser((user, done) => {
    console.log(`serializing user object ${user}`);
    //instead of returning the user id make the jwt and give it to the null funciton
    const userToken = (0, helpers_1.generateUserJWT)(user);
    done(null, userToken);
});
passport_1.default.deserializeUser((userToken, done) => {
    console.log(`deserializing user by id ${userToken}`);
    const validatedTokenData = (0, helpers_1.verifyUserJWT)(userToken);
    console.log(validatedTokenData);
    if (validatedTokenData == null) {
        throw new Error("an error happened while parsing user token");
    }
    try {
        const user = user_1.User.findOne({ _id: validatedTokenData.userId });
        if (!user)
            throw new Error("User Not Found");
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
});
exports.default = passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "username"
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({ username: username });
        if (!user || !(0, helpers_1.comparePassword)(password, user.password))
            throw new Error("No Active Users With This Credentials");
        done(null, user);
    }
    catch (err) {
        done(err, false);
    }
})));
