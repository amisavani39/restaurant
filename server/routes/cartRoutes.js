const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add to cart
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ ...product, quantity: 1 }],
    });
  } else {
    const index = cart.items.findIndex(
      item => item.productId === product.productId
    );

    if (index > -1) {
      cart.items[index].quantity += 1;
    } else {
      cart.items.push({ ...product, quantity: 1 });
    }
  }

  await cart.save();
  res.json(cart);
});

// Get cart
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart);
});

module.exports = router;