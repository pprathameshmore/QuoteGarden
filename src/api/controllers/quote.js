
const QuoteService = require("../../services/quote");
const { response } = require("../../utils/utils");

const getRandomQuotes = async (req, res, next) => {
  const { author, genre, query, count = 1, page = 1, limit = 10 } = req.query;
  const {
    docs,
    totalDocs: totalQuotes,
    page: currentPage,
    totalPages,
    nextPage,
  } = await QuoteService.getRandom(author, genre, query, count, {
    page,
    limit,
  });
  return res.status(200).json(
    response(
      200,
      `Random quotes`,
      {
        currentPage,
        nextPage,
        totalPages,
      },
      totalQuotes,
      docs
    )
  );
};

const getAllQuotes = async (req, res, next) => {
  const { author, genre, query, page = 1, limit = 10 } = req.query;
  const {
    docs,
    totalDocs: totalQuotes,
    page: currentPage,
    totalPages,
    nextPage,
  } = await QuoteService.getAllQuotes(author, genre, query, { page, limit });
  return res
    .status(200)
    .json(
      response(
        200,
        `Quotes`,
        { currentPage, nextPage, totalPages },
        totalQuotes,
        docs
      )
    );
};

module.exports = {
  getRandomQuotes,
  getAllQuotes
};
