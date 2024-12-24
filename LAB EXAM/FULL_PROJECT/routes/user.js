const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Product = require("../models/product");
const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user"); // Import User model
const middleware = require("../middleware");
const {
  userSignUpValidationRules,
  userSignInValidationRules,
  validateSignup,
  validateSignin,
} = require("../config/validator");

const csrfProtection = csrf();
router.use(csrfProtection);

// GET: display the signup form with CSRF token
router.get("/signup", middleware.isNotLoggedIn, (req, res) => {
  const errorMsg = req.flash("error")[0];
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    errorMsg,
    pageName: "Sign Up",
  });
});

// POST: handle the signup logic
router.post(
  "/signup",
  [
    middleware.isNotLoggedIn,
    userSignUpValidationRules(),
    validateSignup,
    passport.authenticate("local.signup", {
      successRedirect: "/user/profile",
      failureRedirect: "/user/signup",
      failureFlash: true,
    }),
  ],
  async (req, res) => {
    try {
      if (req.session.cart) {
        const cart = await new Cart(req.session.cart);
        cart.user = req.user._id;
        await cart.save();
      }
      if (req.session.oldUrl) {
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
      } else {
        res.redirect("/user/profile");
      }
    } catch (err) {
      console.error(err);
      req.flash("error", err.message);
      return res.redirect("/");
    }
  }
);

// GET: display the signin form with CSRF token
router.get("/signin", middleware.isNotLoggedIn, (req, res) => {
  const errorMsg = req.flash("error")[0];
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    errorMsg,
    pageName: "Sign In",
  });
});

// POST: handle the signin logic
router.post(
  "/signin",
  [
    middleware.isNotLoggedIn,
    userSignInValidationRules(),
    validateSignin,
    passport.authenticate("local.signin", {
      failureRedirect: "/user/signin",
      failureFlash: true,
    }),
  ],
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id });
      if (req.session.cart && !cart) {
        const cart = await new Cart(req.session.cart);
        cart.user = req.user._id;
        await cart.save();
      }
      if (cart) {
        req.session.cart = cart;
      }
      if (req.session.oldUrl) {
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
      } else {
        res.redirect("/user/profile");
      }
    } catch (err) {
      console.error(err);
      req.flash("error", err.message);
      return res.redirect("/");
    }
  }
);

// GET: display user's profile
router.get("/profile", middleware.isLoggedIn, async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  try {
    const allOrders = await Order.find({ user: req.user });
    res.render("user/profile", {
      orders: allOrders,
      errorMsg,
      successMsg,
      pageName: "User Profile",
    });
  } catch (err) {
    console.error(err);
    return res.redirect("/");
  }
});

// GET: logout
router.get("/logout", middleware.isLoggedIn, (req, res) => {
  req.logout();
  req.session.cart = null;
  res.redirect("/");
});

// POST: Add product to wishlist
router.post("/wishlist/:productId", middleware.isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findById(req.user._id);

    // Check if product is already in wishlist
    if (user.wishlist.includes(productId)) {
      req.flash("error", "Product is already in your wishlist.");
      return res.redirect("back");
    }

    // Add product to wishlist
    user.wishlist.push(productId);
    await user.save();

    req.flash("success", "Product added to wishlist.");
    res.redirect("back");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});

// GET: View wishlist
router.get("/wishlist", middleware.isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.render("user/wishlist", {
      wishlist: user.wishlist,
      pageName: "Your Wishlist",
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Could not load wishlist.");
    res.redirect("back");
  }
});

module.exports = router;
