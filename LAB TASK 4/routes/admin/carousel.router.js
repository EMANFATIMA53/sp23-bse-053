const express = require("express");
const multer = require("multer");
const Carousel = require("../../models/carousel.model"); // Carousel Model
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/carousel");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Route to show all carousel images
router.get("/admin/carousel", async (req, res) => {
  try {
    const carousels = await Carousel.find();
    res.render("admin/carousel", { carousels });
  } catch (err) {
    console.error("Error fetching carousels:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to show form for adding a new carousel
router.get("/admin/carousel/new", (req, res) => {
  res.render("admin/form");
});

// Route to handle form submission (add new carousel)
router.post("/admin/carousel", upload.single("image"), async (req, res) => {
  try {
    const imagePath = `/uploads/carousel/${req.file.filename}`;
    await Carousel.create({ image: imagePath });
    res.redirect("/admin/carousel");
  } catch (err) {
    console.error("Error adding new carousel:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to show edit form for a specific carousel
router.get("/admin/carousel/edit/:id", async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);
    res.render("admin/edit", { carousel });
  } catch (err) {
    console.error("Error fetching carousel:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to update a carousel image
router.post("/admin/carousel/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const imagePath = `/uploads/carousel/${req.file.filename}`;
    await Carousel.findByIdAndUpdate(req.params.id, { image: imagePath });
    res.redirect("/admin/carousel");
  } catch (err) {
    console.error("Error updating carousel:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to delete a carousel image
router.post("/admin/carousel/delete/:id", async (req, res) => {
  try {
    await Carousel.findByIdAndDelete(req.params.id);
    res.redirect("/admin/carousel");
  } catch (err) {
    console.error("Error deleting carousel:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;




