import { generateVerificationOtpEmailTemplate } from "./emailTemplate.js";

export async function sendVerificationCode({ verificationCode, email, res }) {
    try {
        const message = generateVerificationOtpEmailTemplate(verificationCode);
        console.log(verificationCode);

        // ✅ Await the email sending function
        await sendEmail({
            email,
            subject: "Verification Code (Book Worm Library Management System)",
            message,
        });

        return res.status(200).json({
            success: true,
            message: "Verification code sent successfully",
        });

    } catch (error) {
        // ✅ Check if headers were already sent before responding
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: "Verification code sending failed",
            });
        }
    }
}
