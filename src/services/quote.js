const Container = require("typedi").Container;

const Quote = require("../models/Quote");
const { GeneralError } = require("../utils/errors");

class QuoteService {
  constructor() {
    this.document = Quote;
  }

  async getDocumentCount(document) {
    //If document parameter null use default document
    if (!document) return await this.document.estimatedDocumentCount();
    return await document.estimatedDocumentCount();
  }

  async getRandom(
    author = "",
    genre = "",
    query = "",
    count = 1,
    { page, limit }
  ) {
    try {
      //Get random quote
      const aggregateQuery = Quote.aggregate([
        {
          $match: {
            $and: [
              { quoteAuthor: new RegExp(author, "ig") },
              { quoteGenre: new RegExp(genre, "ig") },
              { quoteText: new RegExp(query, "ig") },
            ],
          },
        },
      ]).sample(parseInt(count));
      const options = {
        page,
        limit,
      };
      const randomQuotes = await Quote.aggregatePaginate(
        aggregateQuery,
        options
      );
      return randomQuotes;
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  async getAllQuotes(author = "", genre = "", query = "", { page, limit }) {
    try {
      const quoteQuery = Quote.find({
        $and: [
          { quoteAuthor: new RegExp(author, "ig") },
          { quoteGenre: new RegExp(genre, "ig") },
          { quoteText: new RegExp(query, "ig") },
        ],
      });
      const options = {
        page,
        limit,
      };
      return await Quote.paginate(quoteQuery, options);
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  async getAllGenres({ page, limit }) {
    try {
      return await Quote.distinct("quoteGenre");
    } catch (error) {
      throw new GeneralError(error);
    }
  }
  async getAllAuthors({ page, limit }) {
    try {
      return await Quote.distinct("quoteAuthor");
    } catch (error) {
      throw new GeneralError(error);
    }
  }
}

module.exports = Container.get(QuoteService);
