import { promises } from "nodemailer/lib/xoauth2"

export const catchAsyncErrors =(thefunction) =>{
    return (req,res, next )=>{
        Promise.resolve(thefunction(req,res,next) ).catch(next);
    }
}