import { Router } from "express";
import {  validationResult, checkSchema, matchedData } from "express-validator";
import { NextFunction, Request ,Response } from "express-serve-static-core"
import { IUser, User } from "../mongoose/schemas/user";
import {  hashPassword } from "../utils/helpers";
import { createUserValidationSchema } from "../utils/validationSchema";
import passport from "passport";
declare module "express-session" {
    interface Session {
      passport?: {
        user?: IUser; 
    }
  }};

const router: Router = Router();
router.post("/signup"
    
    ,checkSchema(createUserValidationSchema)
    ,async (request:Request, response:Response ,next:NextFunction)=>{
    
    const results = validationResult(request);
    if (!results.isEmpty()) {
         response.status(400).send(results.array());
      }
    const data = matchedData(request)

    data.password = hashPassword(data.password);

    const newUser = new User(data);
    try {
        const savedUser = await newUser.save();
         response.status(201).send(savedUser); 
    } catch (err){
        console.log(err);
        response.sendStatus(400);
    }

});

router.post("/login"
    ,checkSchema(createUserValidationSchema)
    ,(request:Request,response:Response ,next:NextFunction )=> {
        const results = validationResult(request);
    if (!results.isEmpty()) {
      response.status(400).send(results.array());
    }
    next(); // Proceed to the next middleware
    }
    ,passport.authenticate("local")
    ,(request:Request, response:Response)=>{
         response.sendStatus(200);
    });

router.get("/status",(request:Request, response:Response)=>{
    console.log("inside the status endpoint");
    response.status(200).send(request.session.passport?.user);
});


export const authRouter:Router = router;