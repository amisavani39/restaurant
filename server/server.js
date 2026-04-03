const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const foodRoutes = require("./routes/food");
const cartRoutes = require("./routes/cartRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// database connection
mongoose.connect("mongodb+srv://demo:ami13@cluster0.ws1qcgg.mongodb.net/restaurant")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/orders", orderRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});