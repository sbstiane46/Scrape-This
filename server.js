var express = require("express");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");
// var axios = require("axios");
// var cheerio = require("cheerio");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
// var logger = require("morgan");

// port set up
var PORT = process.env.PORT || 3000;

//express initiation
var app = express();

//express router
var router = express.Router();

// //require router
require("./config/routes.js")(router);

//public folder directory
app.use(express.static(__dirname + "/public"));

//connection of handlebars to express
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//bodyParser in app
app.use(bodyParser.urlencoded({
    extended: false
}));

//request through router
app.use(router);


//deployed database or local database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

//connection of mongoose to database
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection successful");
    }
});

//listen on port
app.listen(PORT, function() {
    console.log("listening on port:" + PORT);
});


