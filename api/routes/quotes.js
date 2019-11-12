const express = require('express');
const router = express.Router();
const QuoteController = require('../controllers/quotes');


//Simple random requests
router.get("/random", QuoteController.random);
//Routes to find as per author's name
router.get("/author/:authorName", QuoteController.author_name);
router.get("/search/:query", QuoteController.search_query);
//Get all quotes
router.get("/all", QuoteController.get_all_quotes);
router.post("/new", QuoteController.create_new_quote);

module.exports = router;