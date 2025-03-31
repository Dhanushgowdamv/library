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
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    },

accountVerified:{
    type:Boolean ,  default:false},
    borrowedBooks:[
        {
            bookId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Borrow"
            },
            returned:{
                type:Boolean,
                default:false,
            },
            bookTitle : String,
            borrowedDate:Date,
            dueDate:Date,
        },
    ],
    avatar:{
        public_id:String,
        url:String,
    },
    verificationCode:Number,
    verificationCodeExpire:Date,
    resetPassword:String,
    resetPasswordExpire:Data,

}, { timestamps: true });  // Adds createdAt & updatedAt automatically

// Hash password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
