import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["host", "member"],
            required: true,
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null, // If applicable
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
