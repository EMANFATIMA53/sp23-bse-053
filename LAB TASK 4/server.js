// require express to make node server
const express = require("express");
// call express function to make server object
let app = express();

// require cookie-parser and session for cookies and session management
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());
app.use(session({ secret: "My session secret" }));

// require mongoose for MongoDB Atlas connection
const mongoose = require("mongoose");

// require package layout options in html rendering
var expressLayouts = require("express-ejs-layouts");

// publically accessible assets placed in public folder are exposed
app.use(express.static("public"));
app.use(express.static("uploads"));

// Middleware to parse body data for form submission
app.use(express.urlencoded());

// Import Product model
let ProductModel = require("./models/product.model");
let CategoryModel = require("./models/category.model");
let CarouselModel = require("./models/carousel.model");

// Setup view engine. ejs must be installed
app.set("view engine", "ejs");
app.use(expressLayouts);

// Add routers
let productsRouter = require("./routes/admin/products.router");
app.use(productsRouter);
let categoryRouter = require("./routes/admin/category.router");
app.use(categoryRouter);
let carouselRouter = require("./routes/admin/carousel.router");
app.use(carouselRouter);



// Routes
app.get("/contact-us", (req, res) => {
  let address = "CUI Lahore Defence Road Off Raiwind Road";
  let phone = "+92123456";
  res.render("contact-us", { address, phone });
});

app.get("/add-to-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  cart = cart ? cart : [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  res.redirect("/");
});

app.get("/cart", async (req, res) => {
  let cart = req.cookies.cart;
  cart = cart ? cart : [];
  let products = await ProductModel.find({ _id: { $in: cart } });
  return res.render("cart", { products });
});

app.get("/", async (req, res) => {
  let products = await ProductModel.find();
  res.render("home", { products });
});

// MongoDB Atlas Connection
let connectionString = "mongodb+srv://emyyft1:qtYzOGlD7FNpavjv@cluster0.osahp.mongodb.net/e-com?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err.message);
  });

// Start the server
app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});

