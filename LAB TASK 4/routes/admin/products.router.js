const mongoose = require("mongoose");
const express = require("express");
let router = express.Router();
let multer = require("multer");
let Product = require("../../models/product.model");
let Category = require("../../models/category.model");

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// PRODUCTS ROUTES

router.get("/admin/products/create", async (req, res) => {
    try {
        let categories = await Category.find(); // Fetch all categories
        res.render("admin/product-form", { layout: "admin/admin-layout", categories });
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).send("Failed to load categories.");
    }
});


// List All Products
router.get("/admin/products", async (req, res) => {
    let products = await Product.find().populate("category");
    res.render("admin/products", { layout: "admin/admin-layout", products });
});

// Show Create Product Form
router.get("/admin/products/create", async (req, res) => {
    let categories = await Category.find();
    res.render("admin/product-form", { layout: "admin/admin-layout", categories });
});

// Handle Create Product Form Submission
router.post("/admin/products/create", upload.single("file"), async (req, res) => {
    let product = new Product(req.body);
    if (req.file) product.picture = req.file.filename;
    product.isFeatured = Boolean(req.body.isFeatured);

    await product.save();
    res.redirect("/admin/products");
});

// Show Edit Product Form
router.get("/admin/products/edit/:id", async (req, res) => {
    let product = await Product.findById(req.params.id).populate("category");
    let categories = await Category.find();
    res.render("admin/product-edit-form", { layout: "admin/admin-layout", product, categories });
});

// Handle Edit Product Form Submission
router.post("/admin/products/edit/:id", upload.single("file"), async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.category = req.body.category;
    product.isFeatured = Boolean(req.body.isFeatured);

    if (req.file) product.picture = req.file.filename;

    await product.save();
    res.redirect("/admin/products");
});

// Delete Product
router.get("/admin/products/delete/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin/products");
});

// CATEGORIES ROUTES

// List All Categories
router.get("/admin/categories", async (req, res) => {
    let categories = await Category.find();
    res.render("admin/categories", { layout: "admin/admin-layout", categories });
});

// Show Create Category Form
router.get("/admin/categories/create", (req, res) => {
    res.render("admin/category-form", { layout: "admin/admin-layout" });
});

// Handle Create Category Form Submission
router.post("/admin/categories/create", async (req, res) => {
    let category = new Category(req.body);
    await category.save();
    res.redirect("/admin/categories");
});

// Show Edit Category Form
router.get("/admin/categories/edit/:id", async (req, res) => {
    let category = await Category.findById(req.params.id);
    res.render("admin/category-edit-form", { layout: "admin/admin-layout", category });
});

// Handle Edit Category Form Submission
router.post("/admin/categories/edit/:id", async (req, res) => {
    let category = await Category.findById(req.params.id);
    category.categoryName = req.body.categoryName;
    await category.save();
    res.redirect("/admin/categories");
});

// Delete Category
router.get("/admin/categories/delete/:id", async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/admin/categories");
});

module.exports = router;
