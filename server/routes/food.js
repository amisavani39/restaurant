const express = require("express");
const router = express.Router();
const { addFood, getFoods, getFoodsByCategory } = require("../controllers/foodController");

router.post("/", addFood);
router.get("/", getFoods);
router.get("/category/:category", getFoodsByCategory);

module.exports = router;