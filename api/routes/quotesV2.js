const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quotesV2");

const cacheMiddleware = require("../middlewares/cache");

/*
Version V2 start from here
*/

//Get random quote
router.get("/v2/quotes/random", quoteController.v2Random);

//Find by author name and search query
router.get(
  "/v2/authors/:authorName",
  cacheMiddleware.isCached,
  quoteController.searchByAuthor
);

//Find by genre name
router.get(
  "/v2/genre/:genreName",
  cacheMiddleware.isCached,
  quoteController.searchByGenre
);

router.get(
  "/v2/genre",
  cacheMiddleware.isCachedAll,
  quoteController.allGenres
);

//Find by search query
router.get(
  "/v2/quotes/:searchQuery",
  cacheMiddleware.isCached,
  quoteController.searchByQuote
);

//All quotes
router.get(
  "/v2/quotes",
  cacheMiddleware.isCachedAll,
  quoteController.allQuotes
);

module.exports = router;
