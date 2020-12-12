const express = require("express");
const router = express.Router();

const quoteRouter = require("./modules/quote");
const genreRouter = require("./modules/genre");
const authorRouter = require("./modules/author");

router.use("/v2/quotes", quoteRouter);
router.use("/v2/genres", genreRouter);
router.use("/v2/authors", authorRouter);

module.exports = router;
