const express = require("express");
const author = express.Router();

const { getAllAuthors } = require("../../controllers/author");

author.route("/").get(getAllAuthors);

module.exports = author;
