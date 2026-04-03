const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addFood, updateFood, getFoods, getFoodsByCategory, deleteFood } = require("../controllers/foodController");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), addFood);
router.put("/:id", upload.single("image"), updateFood);
router.get("/", getFoods);
router.get("/category/:category", getFoodsByCategory);
router.delete("/:id", deleteFood);

module.exports = router;