import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"] // E.164 validation
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    accountVerified: {
        type: Boolean,
        default: false
    },
    borrowedBooks: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Borrow"
            },
            returned: {
                type: Boolean,
                default: false
            },
            bookTitle: String,
            borrowedDate: Date,
            dueDate: Date
        }
    ],
    avatar: {
        public_id: String,
        url: String
    },
    verificationCode: { type: Number },  // ✅ Added this field
    verificationCodeExpire: Date,
    resetPassword: String,
    resetPasswordExpire: Date

}, { timestamps: true });  // Adds createdAt & updatedAt automatically

// Generate the verification code
userSchema.methods.generateVerificationCode = function () {
    this.verificationCode = Math.floor(10000 + Math.random() * 90000); // Always 5-digit number
    this.verificationCodeExpire = Date.now() + 15 * 60 * 1000; // Expires in 15 mins
    return this.verificationCode;
    
};


// Hash password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
