import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {IUser} from "../mongoose/schemas/user";


const saltRounds: number = 10;
const JWTSecret: jwt.Secret = "VerySecretKey";

export const hashPassword =  (password:string): string =>{
    
    const salt: string = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password,salt);
};

export const comparePassword = (plain:string, hashed:string):boolean => {
    return bcrypt.compareSync(plain,hashed)
};

export const generateUserJWT = (user:IUser):string =>{
    const payload = {
        userId: user.id,
        username: user.username
    }
    return jwt.sign(payload,JWTSecret)
};

export const verifyUserJWT= (token:string): jwt.JwtPayload  | null=>{
    try{

        const validatedTokenData = jwt.verify(token, JWTSecret);
        if (typeof validatedTokenData == "string"){
            throw new Error("an error happened while parsing user token")
        }
        return validatedTokenData;
    }catch (error){
        console.log(error)
        return null
    }
};