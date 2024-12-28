import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWTSecret = "VerySecretKey";

export const hashPassword =  (password) =>{
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password,salt);
};

export const comparePassword = (plain, hashed) => {
    return bcrypt.compare(plain,hashed)
};

export const generateUserJWT = (user) =>{
    const payload = {
        userId: user.id,
        username: user.username
    }
    return jwt.sign(payload,JWTSecret)
};

export const verifyUserJWT= (token)=>{
    try{
        console.log(token);
        const validatedTokenData = jwt.verify(token, JWTSecret);
        console.log(validatedTokenData);
        return validatedTokenData;
    }catch (error){
        console.log(error)
        return null
    }
};