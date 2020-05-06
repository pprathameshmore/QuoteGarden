const mongoose = require("mongoose");

//Define schema for quotes
const quoteSchema = new mongoose.Schema({
    quoteText: String,
    quoteAuthor: String,
    quoteGenre: String
});

//Create model on the basis of quote schema
const Quote = new mongoose.model("quote", quoteSchema);

module.exports = Quote;
