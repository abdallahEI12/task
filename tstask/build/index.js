"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = require("./routes");
require("./startegies/local-strategy");
const app = (0, express_1.default)();
const PORT = 3000;
mongoose_1.default.connect("mongodb://root:strongpassowrd@mongo:27017/express_app?authSource=admin")
    .then(() => console.log("connected the database"))
    .catch((err) => console.log(`an error has occurred${err}`));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)("verySecretKey"));
app.use((request, response, next) => {
    console.log(`${request.method} - ${request.protocol}://${request.hostname}${request.url}`);
    next();
});
app.use((0, express_session_1.default)({
    secret: "VerySecretKey",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(routes_1.mainRouter);
app.listen(PORT, () => {
    console.log(`running typescrpit server on port ${PORT}`);
});
