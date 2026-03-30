const Food = require("../models/Food");

// @desc    Add a new food item
// @route   POST /api/food
exports.addFood = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const newFood = new Food({ name, price, description, category, image });
    await newFood.save();
    res.status(201).json({ message: "Food item created", food: newFood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Get all food items
// @route   GET /api/food
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Get foods by category
// @route   GET /api/food/category/:category
exports.getFoodsByCategory = async (req, res) => {
  try {
    const foods = await Food.find({ category: req.params.category });
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};