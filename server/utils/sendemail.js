import nodemailer from "nodemailer"

export const sendEmail = async ({email,subject, message})=>{
    const transporter = nodemailer.createtranport()
}