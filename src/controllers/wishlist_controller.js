import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user_model.js";
import Wishlist from "../models/wishlist_model.js";
import QRCode from "qrcode";

const createWishlist = asyncHandler(async (req, res) => {
    try {
        const { name, description, category, priority } = req.body;
        if(!name || !description || !category || !priority)
        {
            return res.status(400).json(new ApiResponse(400,{},"All fields are required"))
        }
        const id = req.user._id;

        const user = await User.findById(id);
        if(!user)
        {
            return res.status(404).json(new ApiResponse(404,{},"User is not available"));
        }

        const qrCode = await QRCode.toDataURL(
            `${process.env.FRONTEND_URL}/wishlist/${name}/${id}`
        );

        const wishlist = await Wishlist.create({
            name,
            description,
            user: id,
            category,
            priority,
            qrCode,
            shareLink: `${process.env.FRONTEND_URL}/wishlist/${name}/${req.user.id}`,
        });

        return res.status(200).json(new ApiResponse(200,wishlist,"Wishlist created successfully"));

    } catch (error) {
        return res.status(500).json(new ApiResponse(500,{},"Error while creating wishlist"));
    }
});

export {createWishlist};