const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Imports
const Quote = require("./models/quote");

//Consts
//const PORT = 3000;
//const URL = "192.168.43.61";
const PORT = process.env.PORT || 3000
`

app.set("view engine", "ejs");
app.use(express.static("public"));

//Database connection
mongoose.connect("mongodb://localhost:27017/quotegarden", { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log("Ooops!!! Something went wrong! :(");
    } else {
        console.log("Successfully connected to database :)");
    }
});

//Simple GET method
app.get("/", (request, response) => {
    //response.send("Hello from API!!! I am running properly! :)");
    
    response.status(200).render("index");
});

//Simple random requests
app.get("/quotes/random", async (request, response) => {
    Quote.count().exec(function (error, count) {
        var random = Math.floor(Math.random() * count);
        Quote.findOne().skip(random).exec(function (error, quote) {
            response.status(200).json(quote);
        });
    });
});

//Routes to find as per search
app.get("quotes/", (request, response) => {
    // response.send("All Authors");
});

//Get all quotes
app.get("quotes/all", (request, response) => {
    response.send("All Quotes");
});

app.get("quotes/new", (request, response) => {
    response.status(200).render("index");
});

app.get("*", (request, response) => {
    response.status(404).render("error");
});

//Start server
app.listen(PORT, () => {
    console.log("Server running on port : " + PORT)
});
