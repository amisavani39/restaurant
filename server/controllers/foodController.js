const Food = require("../models/Food");
const fs = require("fs");
const path = require("path");

// @desc    Add a new food item
// @route   POST /api/food
exports.addFood = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    let image = "";
    
    if (req.file) {
      image = `uploads/${req.file.filename}`;
    }

    const newFood = new Food({ name, price, description, category, image });
    await newFood.save();
    res.status(201).json({ message: "Food item created", food: newFood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Update a food item
// @route   PUT /api/food/:id
exports.updateFood = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    let image = food.image;
    if (req.file) {
      // Delete old image if it exists
      if (food.image && fs.existsSync(path.join(__dirname, "..", food.image))) {
        fs.unlinkSync(path.join(__dirname, "..", food.image));
      }
      image = `uploads/${req.file.filename}`;
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, image },
      { new: true }
    );

    res.json({ message: "Food item updated", food: updatedFood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/food/:id
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    // Delete image file if it exists
    if (food.image && fs.existsSync(path.join(__dirname, "..", food.image))) {
      fs.unlinkSync(path.join(__dirname, "..", food.image));
    }

    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food item deleted" });
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
