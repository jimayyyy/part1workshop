import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Homme", "Femme", "Autre"],
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const User = mongoose.model("User", UserSchema);
