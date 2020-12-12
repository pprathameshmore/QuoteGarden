const express = require("express");
const genre = express.Router();

const { getAllGenres } = require("../../controllers/genre");

genre.route("/").get(getAllGenres);

module.exports = genre;
