var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var logger = require("morgan");

//express initiation
var app = express();
app.use(logger("dev"));

//router
var router = express.Router();

