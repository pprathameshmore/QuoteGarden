const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quotes');

const cacheMiddleware = require('../middlewares/cache');

//Simple random requests
router.get("/random", quoteController.random);
//Routes to find as per author's name
router.get("/author/:authorName", quoteController.author_name);
router.get("/search/:query", quoteController.search_query);
//Get all quotes
router.get("/all", quoteController.get_all_quotes);
router.post("/new", quoteController.create_new_quote);


module.exports = router;