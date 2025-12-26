import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        status: {
            type: String,
            enum: [
                "New",
                "Engaged",
                "Proposal Sent",
                "Closed-Won",
                "Closed-Lost",
            ],
            default: "New"
        }
    },
    {
        timestamps: true
    }
) 

export const Lead = mongoose.model("Lead", leadSchema)