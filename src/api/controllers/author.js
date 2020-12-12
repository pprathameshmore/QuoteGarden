const QuoteService = require("../../services/quote");
const { response } = require("../../utils/utils");

const getAllAuthors = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const authors = await QuoteService.getAllAuthors({ page, limit });

  return res
    .status(200)
    .json(
      response(
        200,
        `Authors`,
        { currentPage: null, nextPage: null, totalPages: null },
        null,
        authors
      )
    );
};

module.exports = {
  getAllAuthors,
};
