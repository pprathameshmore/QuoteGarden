const QuoteService = require("../../services/quote");
const { response } = require("../../utils/utils");

const getAllGenres = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const genres = await QuoteService.getAllGenres({ page, limit });

  return res
    .status(200)
    .json(
      response(
        200,
        `Genres`,
        { currentPage: null, nextPage: null, totalPages: null },
        null,
        genres
      )
    );
};

module.exports = {
  getAllGenres,
};
