const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

//Imports
const Quote = require("./api/models/quote");
const quotesRoute = require('./api/routes/quotes');

//Database connection
mongoose.connect(process.env.DB_URL, {
    dbName: 'quotes',
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log("Connected to Database");
});
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/quotes', quotesRoute);

app.use('/', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.send("<h2> Documentation can found on <a href='https://pprathameshmore.github.io/QuoteGarden/'>here</a> ");
    next();
});



module.exports = app;