import { Router } from "express";
import {  validationResult, checkSchema, matchedData } from "express-validator";
import { User } from "../mongoose/schemas/user.mjs";
import {  hashPassword } from "../utils/helpers.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import passport from "passport";





const router =  Router();

router.post("/signup"
    
    ,checkSchema(createUserValidationSchema)
    ,async (request, response)=>{
    const results = validationResult(request);
    if (results.errors.length !=0) return response.status(400).send(results.array());
    const data = matchedData(request)

    data.password = hashPassword(data.password);

    const newUser = new User(data);
    try {
        const savedUser = await newUser.save();
        return response.status(201).send(savedUser); 
    } catch (err){
        console.log(err);
        return response.sendStatus(400);
    }

});

router.post("/login"
    ,checkSchema(createUserValidationSchema)
    ,async (request,response,next )=> {
    const results = validationResult(request)
    if (results.errors.length !=0) return response.status(400).send(results.array())
    next();
    }
    ,passport.authenticate("local")
    ,(request, response)=>{
        response.sendStatus(200);
    });

router.get("/status",(request, response)=>{
    console.log("inside the status endpoint");
    return response.status(200).send(request.session.passport.user);
})

export const authRouter = router;