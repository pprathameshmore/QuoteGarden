const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quotesV2');

const cacheMiddleware = require('../middlewares/cache');

/*
Verion V2 start from here
*/

//Get random quote
router.get('/v2/random', quoteController.v2Random);

//Find by author name and serch query
router.get('/v2/authors/:authorName', cacheMiddleware.isCached, quoteController.searchByAuthor);

//Find by search query
router.get('/v2/quotes/:searchQuery', cacheMiddleware.isCached, quoteController.searchByQuote);

//All quotes
router.get('/v2/all', cacheMiddleware.isCachedAll, quoteController.allQuotes);

module.exports = router;