import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from"../models/userModel.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { sendVerificationCode } from "../utils/sendVerificationCode.js";

export const register = catchAsyncErrors(async(req, resizeBy, next)=>{
 try {
    const {name, email, password, phoneNumber} = req.body;
         if(!name || !email || !password || !phoneNumber){
             return next(new ErrorHandler ("please enter all the fields ",400));
         }

         const isRegistered = await User.findOne({email , accountVerified:true});
         if(isRegistered){
            return next(new ErrorHandler("user already exists",400))
         }


        const registetrationAttemptByUser = await User.find({
            email,
            accountVerified:false,
        });


        if(registetrationAttemptByUser.length >=5){
            return  next(
                new ErrorHandler(
                    "you have exceed the number of asttempts  please contact support",
                    400
                )
            )
        }


        if(password.length < 8 || password.length >16){
            return  next (
                new ErrorHandler("Password must be between 8 to 16 characters.")
            )
        }
     
        const user = await User.create({
            name,
            email,
            password:this.password,
        })

        const verificationCode = await User.generateVerificationCode();
        await user.save();
        sendVerificationCode(verificationCode,email, res)

        //  used for the fourther implemnantation
        // function validatePassword(password) {
        //     // Check length
        //     if (password.length < 8 || password.length > 16) {
        //         return "Password must be between 8 to 16 characters.";
        //     }
        
        //     // Regex to check password complexity
        //     const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        
        //     if (!passwordRegex.test(password)) {
        //         return "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &).";
        //     }
        
        //     return "Password is valid!";
        // }


 } catch (error) {

    next(error);
    
 }


})