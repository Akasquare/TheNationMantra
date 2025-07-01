
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require("passport-local");
require("dotenv").config();

const User = require("./models/User.js");  
const ExpressError = require("./utils/ExpressError.js");

const app = express();
const dbUrl = process.env.ATLASDB_URL;
// Connect to MongoDB
main()
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.log(" DB Error:", err));

async function main() {
  await mongoose.connect(dbUrl);
}
// Middlewares
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));


 



const store = MongoStore.create({
  // mongoUrl:dbUrl,
  mongoUrl:process.env.MONGO_URI,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
});

store.on("error", ()=>{
  console.log("ERROR in mongo session store", err)
})

const sessionOptions = {
  store,
  secret : process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7* 24 * 60 *60 * 1000,
    maxAge :  7* 24 * 60 *60 * 1000,
    httpOnly: true,
  }
}

app.get("/", (req, res) => {
  console.log("root middleware");
  res.redirect("/news");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate())); // 👈 from passport-local-mongoose

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res ,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user ;
  // console.log(res.locals.success)
  next();
})

// Routes
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");




app.use("/auth",authRoutes);
app.use("/news", newsRoutes);



app.get("/delete-all", async (req, res) => {
  try {
    await News.deleteMany({});
    res.send("✅ All news deleted successfully.");
  } catch (err) {
    res.status(500).send("❌ Error deleting news.");
  }
});


app.use( (req, res,next)=>{

 console.log("1st middleware");
 next(new ExpressError(404, "Page Not Found"))
 // res.send("im in middle");
})

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  console.error("🔥 FULL ERROR:", err);
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

// Start server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on 8080 port"));
