const express = require("express");
const quote = express.Router();

const { getRandomQuotes, getAllQuotes } = require("../../controllers/quote");

quote.route("/random").get(getRandomQuotes);
quote.route("/").get(getAllQuotes);

module.exports = quote;
