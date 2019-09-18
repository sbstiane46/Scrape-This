// Scrape script
//==============

//Require request and cheerio
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.npr.org/sections/environment/", function(err, res, body){

    var $ = cheerio.load(body);

    var articles = [];

    $(".item-info").each(function(i, element){

        var head = $(this).children(".title").text().trim();
        var sum = $(this).children(".teaser").text().trim();

        if(head && sum) {
            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var sumNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            var dataToAdd = {
                headline: headNeat,
                summary: sumNeat
            };

            articles.push(dataToAdd);
        }
        });
        cb(articles);
    });
};

module.exports = scrape;