import express from "express";
import { mainRouter } from "./routes/index.mjs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local-startegy.mjs"

const app = express()
const PORT = 3000

mongoose.connect("mongodb://root:strongpassowrd@mongo:27017/express_app?authSource=admin")
    .then(()=> console.log("connected to database"))
    .catch((err) => console.log(`an error has occurred ${err}`));
app.use(express.json());
app.use(cookieParser("VerySecretKey"));
app.use(session({
    secret: "VerySecretKey",
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:60000*60,

    }
})) 

app.use(passport.initialize())
app.use(passport.session())
app.use(mainRouter);




app.listen(PORT,()=>{
    console.log(`server started listening on port ${PORT}`)
})


