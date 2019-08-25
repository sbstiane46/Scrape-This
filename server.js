var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
// var logger = require("morgan");

//express initiation
var app = express();

//database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

//mongojs configuration to db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});

//logger
app.get("/", function(req, res) {
    res.send("Hello world");
});
// rout data
app.get("/all", function(req, res) {
    db.scrapedData.find({}, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(found);
        }
    });
});

//router
var router = express.Router();

app.get("/scrape", function(req, res) {
    request("https://www.npr.org/sections/news/", function(error, response, html) {
        var $ = cheerio.load(html);

        $(".title").each(function(i, element) {
            var title = $(this).children("a").text();
            var link = $(this).children("a").attr("href");

            if (title && link) {
                db.scrapedData.save({
                    title: title,
                    link: link
                },
                function(error, saved) {
                    if (error) {
                        console.log(error);
                    }

                    else {
                        console.log(saved);
                    }
                });
                
            }
        });
    });

    res.send("Scrape complete");
})

app.listen(3000, function() {
    console.log("App running on port 3000");
});