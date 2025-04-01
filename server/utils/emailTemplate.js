export function generateVerificationOtpEmailTemplate(name, otpCode) {
    return `
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center;">
                <h2 style="color: #007bff; margin-bottom: 10px;">Email Verification</h2>
                <p style="color: #555; font-size: 16px;">Hello <strong>${name}</strong>,</p>
                <p style="color: #555; font-size: 16px;">Your One-Time Password (OTP) for verification is:</p>
                <h1 style="color: #007bff; font-size: 32px; background: #f3f3f3; display: inline-block; padding: 10px 20px; border-radius: 8px; letter-spacing: 4px;">${otpCode}</h1>
                <p style="color: #555; font-size: 14px; margin-top: 10px;">Please enter this OTP to verify your email. This OTP is valid for <strong>10 minutes</strong>.</p>
                <p style="color: #777; font-size: 12px;">If you did not request this, please ignore this email.</p>
                <div style="margin-top: 20px;">
                    <a href="#" style="text-decoration: none; background: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px; display: inline-block; font-size: 16px;">Verify Now</a>
                </div>
            </div>
            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
            <p style="text-align: center; font-size: 12px; color: #777;">Best Regards,<br><strong>Your App Team</strong></p>
        </div>
    `;
}
