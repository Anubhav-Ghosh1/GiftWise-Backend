import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  gift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift',
    required: true,
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['reserved', 'purchased'],
    default: 'reserved',
  },
  reservedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Reservation = mongoose.model('Reservation', reservationSchema);