import passport from "passport";
import { Strategy } from "passport-local";
import { User,IUser } from "../mongoose/schemas/user";
import { comparePassword,generateUserJWT,verifyUserJWT } from "../utils/helpers";

passport.serializeUser((user, done: (err: any, id?: unknown) => void):void =>{
    console.log(`serializing user object ${user}`);
    //instead of returning the user id make the jwt and give it to the null funciton
    const userToken:string = generateUserJWT(user as IUser)
    done(null,userToken);


});

passport.deserializeUser((userToken:string, done)=>{

    console.log(`deserializing user by id ${userToken}`)
    const validatedTokenData = verifyUserJWT(userToken)
    console.log(validatedTokenData);
    if(validatedTokenData == null){
        throw new Error("an error happened while parsing user token")
    }
    try{
        const user = User.findOne({_id:validatedTokenData.userId});
        if(!user) throw new Error("User Not Found");

        done(null, user);
    }catch (err){
        done(err, null);
    }
});

export default passport.use(    
    new Strategy({
        usernameField: "username"
    },async (username:string, password:string, done)=>{
    try{
        const user: IUser | null = await User.findOne({username: username})
        if(!user || !comparePassword(password, user.password)) throw new Error("No Active Users With This Credentials")
        done(null, user)
    }catch (err){
        done(err, false)
    
    }
})
);
