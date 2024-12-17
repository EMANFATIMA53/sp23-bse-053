const express = require("express");
const multer = require("multer");
const Carousel = require("../../models/carousel.model"); // Assuming a Carousel model
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/carousels"); // Folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
const upload = multer({ storage: storage });

// GET route to show carousel management page
router.get("/admin/carousels", async (req, res) => {
  try {
    const carousels = await Carousel.find();
    res.render("admin/carousels", { carousels });
  } catch (err) {
    console.error("Error fetching carousels:", err.message);
    res.status(500).send("Server Error");
  }
});

// POST route to update carousel images
router.post("/admin/carousels", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.body; // ID of the carousel to update
    const imagePath = `/uploads/carousels/${req.file.filename}`; // Path to the uploaded image

    // Update the carousel image in the database
    await Carousel.findByIdAndUpdate(id, { image: imagePath });
    res.redirect("/admin/carousels");
  } catch (err) {
    console.error("Error updating carousel image:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
