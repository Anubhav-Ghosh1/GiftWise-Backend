import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
        },
        gifts: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        category: {
            type: String,
            required: true,
            default: "General",
        },
        priority: {
            type: Number,
            required: true,
            default: 10,
        },
        qrCode: {
            type: String,
        },
        shareLink: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);