const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  persons: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);