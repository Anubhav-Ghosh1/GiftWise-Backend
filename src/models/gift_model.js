import mongoose from "mongoose";

const giftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      imageUrl: {
        type: String,
      },
      status: {
        type: String,
        enum: ['available', 'reserved', 'purchased'],
        default: 'available',
      },
      reservedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
      addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
},{timestamps: true});

export const Gift = mongoose.model("Gift",giftSchema);