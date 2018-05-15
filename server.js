// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
// Requiring Comment and Article models
const Comment = require("./models/Comment.js");
const Article = require("./models/Article.js");
// Requiring routing controllers
const htmlRouter = require("./controllers/html-routes.js");
const articleRouter = require("./controllers/article-routes.js");
// Scraping tools
const request = require("request");
const cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
const port = process.env.PORT || 3000;
const app = express();

// Use body parser with the app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Initialize Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routing
app.use("/", htmlRouter);
app.use("/", articleRouter);

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/news-scraper';
mongoose.connect(URI);
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
    console.log("Mongoose connection successful.");
});

// Listen on port 3000
app.listen(port, function () {
    console.log("App running on port 3000!");
});