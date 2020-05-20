const mongoose = require("mongoose");

//Define schema for quotes
const quoteSchema = new mongoose.Schema({
    quoteText: String,
    quoteAuthor: String,
    quoteGenres: String
});

quoteSchema.index({ '_id': 1, 'quoteText': 1 });

//Create model on the basis of quote schema
const Quote = new mongoose.model("quote", quoteSchema);

module.exports = Quote;
