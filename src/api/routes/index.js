const express = require("express");
const router = express.Router();

const quoteRouter = require("./modules/quote");
const genreRouter = require("./modules/genre");
const authorRouter = require("./modules/author");

router.use("/v3/quotes", quoteRouter);
router.use("/v3/genres", genreRouter);
router.use("/v3/authors", authorRouter);

module.exports = router;
