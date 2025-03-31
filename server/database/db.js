import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "mern_Stack_lib_management",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("✅ MongoDB is connected successfully");
    })
    .catch(err => {
        console.error("❌ Error in connecting:", err);
        process.exit(1); // Exit process if connection fails
    });
};



//tVki2wjTkyIGrnAq
// dhanushvenu199