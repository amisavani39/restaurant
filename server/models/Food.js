const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Pizza', 'Burger', 'Drink'
  image: { type: String } // URL to food image
}, { timestamps: true });

module.exports = mongoose.model("Food", FoodSchema);