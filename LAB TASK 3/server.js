const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(cors());
app.options('*', cors())

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// MongoDB Connection Function
async function connectDB() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'e-com'
    });
    console.log("Connected to local MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    throw err; // Re-throw the error to handle it in the main connection logic
  }
}

// Import Routers
let productsRouter = require("./routes/admin/products.router");
app.use("/admin/products", productsRouter);
let categoryRouter = require("./routes/admin/category.router");
app.use("/admin/categories", categoryRouter);


// API Routes
const api = process.env.API_URL;
if (!api) {
  console.error("API_URL is not defined in .env file.");
  process.exit(1);
}

let categoriesRoutes = require("./routes/admin/category.router");
let productsRoutes = require("./routes/admin/products.router");


app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);


// Add routes
app.get("/", async (req, res) => {
  const ProductModel = require("./models/product.model");
  try {
    let products = await ProductModel.find().populate("category");
    res.render("home", { products });
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err.message);
    process.exit(1); // Exit the application if the database connection fails
  });
