import express  from "express";
import { NextFunction, Request ,Response } from "express-serve-static-core"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { mainRouter } from "./routes";
import "./startegies/local-strategy";


const app = express();

const PORT: number = 3000;

mongoose.connect("mongodb://root:strongpassowrd@mongo:27017/express_app?authSource=admin")
.then((): void => console.log("connected the database"))
.catch((err: Error): void =>console.log(`an error has occurred${err}`))
app.use(express.json());
app.use(cookieParser("verySecretKey"));
app.use((request: Request, response: Response, next:NextFunction):void=>{
    console.log(`${request.method} - ${request.protocol}://${request.hostname}${request.url}`);
    next();
});
app.use(session({
    secret: "VerySecretKey",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:60000 * 60
    }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(mainRouter);

app.listen(PORT,(): void=>{
    console.log(`running typescrpit server on port ${PORT}`)
});

