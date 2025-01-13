import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user_model.js";
import Wishlist from "../models/wishlist_model.js";
import Gift from "../models/gift_model.js"
import QRCode from "qrcode";
import { ApiError } from "../utils/ApiError.js";

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

        const updated_user = await User.findByIdAndUpdate(id,{
            $push:{
                wishlist:wishlist._id
            }
        })

        return res.status(200).json(new ApiResponse(200,wishlist,"Wishlist created successfully"));

    } catch (error) {
        return res.status(500).json(new ApiResponse(500,{},"Error while creating wishlist"));
    }
});

const addGiftToWishlist = asyncHandler(async(req,res) => {
    try
    {
        const {giftId,wishlistId} = req.body;
        if(!giftId || !wishlistId)
        {
            throw new ApiError(400,"All fields are required");
        }

        const wishlist = await Wishlist.findById(new mongoose.Types.ObjectId(wishlistId));
        if(!wishlist)
        {
            throw new ApiError(404,"Wishlist is not present");
        }

        const gift = await Gift.findById(giftId);
        if(!gift)
        {
            throw new ApiError(404,"Gift id is invalid");
        }

        const updatedWishlist = await Gift.findByIdAndUpdate(wishlist._id,{
            $push:{
                gifts: gift._id
            }
        },{new: true})
        return res.status(200).json(new ApiResponse(200,updatedWishlist,"Gift added to the wishlist successfully"));
    }
    catch(e)
    {
        return res.status(500).json(new ApiResponse(500,{},"Error while adding product to wishlist"));
    }
})

const getUserWishlist = asyncHandler(async (req,res) => {
    try
    {
        const id = req.user._id;
        const user = await User.findById(id);
        if(!user)
        {
            return res.status(404).json(new ApiResponse(404,{},"User is not available"));
        }
        const wishlist = await User.findById(user._id).populate("wishlist");
        return res.status(200).json(new ApiResponse(200,wishlist,"Wishlist fetched successfully"));
    }
    catch(e)
    {
        return res.status(500).json(new ApiResponse(500,{},"Error while getting wishlist"));
    }
})

export {createWishlist,addGiftToWishlist,getUserWishlist};