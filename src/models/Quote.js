const mongoose = require("../loaders/database");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongoosePaginate = require("mongoose-paginate-v2");

const QuoteSchema = mongoose.Schema({
  quoteText: String,
  quoteAuthor: String,
  quoteGenre: String,
});

QuoteSchema.plugin(aggregatePaginate);
QuoteSchema.plugin(mongoosePaginate);

QuoteSchema.index({
  quoteText: "text",
  quoteAuthor: "text",
  quoteGenre: "text",
});

module.exports = new mongoose.model("Quote", QuoteSchema);
