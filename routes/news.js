
const multer = require("multer");
const { storage } = require("../cloudconfig.js");  
const upload = multer({ storage });
const { isContributor } = require("../middleware/role");  

const express = require('express');
const router = express.Router();
const News = require('../models/News');
const User = require('../models/User.js');
const wrapAsync = require("../utils/wrapAsync.js");
 


// Home Page - List news
router.get('/',  wrapAsync( async (req, res) => {
  const topNews = await News.find().sort({ timestamp: -1 }).limit(10).populate('author');
  res.render("listings/index.ejs", { newsList: topNews });
}));

// Article Page
router.get('/article/:id', async (req, res) => {
  console.log(req.params)
  const article = await News.findById(req.params.id).populate('author');
  res.render("listings/article.ejs", { article });
});

 



// Contributor dashboard

router.get('/dashboard', isContributor, async (req, res) => {
  const userPosts = await News.find({ author: req.user._id }).populate('author');
  console.log(req.user);
  console.log(userPosts);
  res.render("listings/dashboard", { user: req.user, posts: userPosts });
});


//rendar to form
router.get('/submit', (req, res) => {
  if (!req.session.user || req.session.user.role === 'user') {
    req.flash("error", "Access denied.");
    return res.redirect("/auth/login");
  }
  res.render("news/new.ejs");
});



// Form to submit news
router.post('/submit', isContributor, upload.single('image'), async (req, res) => {
  const { title, content, category } = req.body;

  const newPost = new News({
    title,
    content,
    category,
    author: req.user._id, // from passport session
  });

  if (req.file) {
    newPost.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await newPost.save();
  req.flash("success", "News article submitted!");
  res.redirect('/news');
});


router.get('/search', async (req, res) => {
  const { q, category } = req.query;
  const query = {};
  if (q) query.title = { $regex: q, $options: 'i' };
  if (category) query.category = category;

  const newsList = await News.find(query).sort({ timestamp: -1 });
  res.render('listings/index', { newsList });
});

//  route to show the creation new 
router.get('/new', (req, res) => {
  res.render('news/new');  
});







module.exports = router;
