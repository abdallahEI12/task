import passport from "passport";
import { Strategy} from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword, generateUserJWT,verifyUserJWT } from "../utils/helpers.mjs";

passport.serializeUser((user, done)=>{
    console.log(`serializing user object ${user}`);
    //instead of returning the user id make the jwt and give it to the null funciton
    const userToken = generateUserJWT(user)
    done(null,userToken);
});
// recieve the jwt which has the user id with in it and search the user by this id
passport.deserializeUser((userToken, done)=>{

    console.log(`deserializing user by id ${userToken}`)
    const validatedTokenData = verifyUserJWT(userToken)
    console.log(validatedTokenData);
    
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
    },async (username, password, done)=>{
    try{
        const user = await User.findOne({username: username})
        if(!user || !comparePassword(password, user.password)) throw new Error("No Active Users With This Credentials")
        done(null, user)
    }catch (err){
        done(err, null)
    
    }
})
);