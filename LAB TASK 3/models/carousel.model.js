const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String }, // Optional: Title for the carousel
  description: { type: String }, // Optional: Description for the carousel
});

module.exports = mongoose.model("Carousel", carouselSchema);
