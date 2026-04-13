const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/user/:userId", getOrdersByUserId);
router.get("/:userId", getOrdersByUserId);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
