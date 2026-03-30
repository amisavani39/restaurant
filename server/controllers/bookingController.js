const Booking = require("../models/Booking");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const { name, phone, email, persons, date, time } = req.body;

    if (!name || !phone || !email || !persons || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check slot availability
    const existing = await Booking.findOne({ date, time });

    if (existing) {
      return res.status(400).json({
        message: "This time slot is already booked"
      });
    }

    const booking = new Booking({
      name,
      phone,
      email,
      persons,
      date,
      time
    });

    await booking.save();

    res.status(201).json({
      message: "Table booked successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Booking updated",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};