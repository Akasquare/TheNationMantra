// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User.js");
const News = require("../models/News");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

// Registration form
router.get("/register", (req, res) => {
  res.render("users/login");
});




// Register user
router.post('/register', wrapAsync(async (req, res, next) => {
  try {
    const { email, name, password, role } = req.body;
    console.log(email)
    console.log(name)
    console.log(password)
    console.log(role)

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already registered');
      return res.redirect('/auth/register');
    }

    // Register using passport-local-mongoose
    const user = new User({ email, name, role });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    // Auto-login after registration
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash('success', 'Welcome to TheNationMantra!');
      res.redirect('/news');
    });

  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/auth/register');
  }
}));

// Login form
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Login logic

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "Invalid email or password",
  }),
  (req, res) => {
    req.flash("success", `Welcome back, ${req.user.name}`);
    res.redirect("/news"); // or wherever you want to redirect
  }
);
// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/news");
});

module.exports = router;
