import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from "../models/userModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsync.js";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        if (!name || !email || !password || !phoneNumber) {
            return next(new ErrorHandler("Please enter all the fields.", 400));
        }

        // Check if the email is already registered & verified
        const isRegistered = await User.findOne({ email, accountVerified: true });
        if (isRegistered) {
            return next(new ErrorHandler("User already exists", 400));
        }

        // Check if the user has tried to register too many times
        const registrationAttempts = await User.find({ email, accountVerified: false });
        if (registrationAttempts.length >= 5) {
            return next(new ErrorHandler("You have exceeded the number of attempts. Please contact support.", 400));
        }

        // Validate password length
        if (password.length < 8 || password.length > 16) {
            return next(new ErrorHandler("Password must be between 8 to 16 characters.", 400));
        }

        // Create a new user
        const user = await User.create({
            name,
            email,
            password,
            phoneNumber,
        });

        // Generate verification code
        const verificationCode = await user.generateVerificationCode();
        await user.save();

        // Send verification code via email
        await sendVerificationCode({ verificationCode, email, res });

        // Send success response
        res.status(201).json({
            success: true,
            message: "User registered successfully. Verification code sent.",
            userId: user._id,
        });

    } catch (error) {
        return next(error);
    }
});

