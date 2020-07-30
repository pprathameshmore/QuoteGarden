require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();

const quotesRoute = require("./api/routes/quotes");
const quoteRouteV2 = require("./api/routes/quotesV2");

mongoose
  .connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    methods: ["GET"],
  })
);
app.use("/quotes", quotesRoute);
app.use("/api", quoteRouteV2);

app.use("/", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/public/index.html");
  next();
});

module.exports = app;
