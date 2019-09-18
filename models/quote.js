const mongoose = require("mongoose");

//Define schema for quotes
const quoteSchema = new mongoose.Schema({
    content: String,
    author: String
});

//Create model on the basis of quote schema
const Quote = new mongoose.model("quote", quoteSchema);

module.exports = Quote;
