const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Imports
const Quote = require("./models/quote");

//Consts
const PORT = 3000;
const URL = "192.168.43.61";

//Database connection
mongoose.connect("mongodb://localhost:27017/quotegarden", { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log("Error");
    } else {
        console.log("Successfully connected to database");
    }
});

//Simple GET method
app.get("/", (request, response) => {
    response.send("Hello from API");
})

//Simple random requests
app.get("/random", async (request, response) => {

    const documentCount = await Quote.estimatedDocumentCount();
    const index = random

    Quote.find({}, (error, quote) => {
        if (error) {
            console.log("Error");
        } else {
            response.json(quote);
        }
    })
})

//Routes to find as per search
app.get("/:author", (request, response) => {
    response.send("All Authors");
});

//Get all quotes
app.get("/all", (request, response) => {
    response.send("All Quotes");
})


//Start server
app.listen(PORT, () => {
    console.log("Server running on port : " + PORT)
})