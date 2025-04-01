import { generateVerificationOtpEmailTemplate } from "./emailTemplate.js";

export async function sendVerificationCode(verificationCode , email, res){
    try {
        const message = generateVerificationOtpEmailTemplate(verificationCode);
        sendEmail({
            email,
            subject:"verification Code ( book worm Library managemebnt system",
            message,
        });

        res.status(200).json({
            success:true,
            message:"verificartion cod esent successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"verification code is faild"
        })
        
    }
}