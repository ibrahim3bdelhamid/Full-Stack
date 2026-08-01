import { model, Schema } from "mongoose";

const userSchema = new Schema({

    name: String,

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: { type: String, enum: ['admin', 'user'], default: "user" },

    isVerified: { type: Boolean, default: false },

    verificationCode: String
}, {
    timestamps: true,
    versionKey: false
})

export const userModel = model("User", userSchema)