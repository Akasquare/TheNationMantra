// models/News.js
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  image: {
    url: String,
    filename: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);
