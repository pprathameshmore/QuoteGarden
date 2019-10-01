const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//Imports
const Quote = require("./models/quote");

//Consts
//const PORT = 3000;
//const URL = "192.168.43.61";
app.set('port', (process.env.PORT || 3000))
const DB_URL = "mongodb+srv://prathameshmore:9420776721@quotedatabase-btgnl.mongodb.net/test?retryWrites=true&w=majority";
const DB_URL_LOCAL = "mongodb://localhost:27017/";
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

//Database connection
mongoose.connect(DB_URL_LOCAL, {
    dbName: 'quotes'
}, {
    useNewUrlParser: true
},
    {
        useUnifiedTopology: true
    },
    (error) => {
        if (error) {
            console.log("Ooops!!! Something went wrong! :(" + error);
        } else {
            console.log("Successfully connected to database :)");
        }
    });

//Simple GET method
app.get("/", (request, response) => {
    response.status(200).render("index");
});


//Simple random requests
app.get("/quotes/random", async (request, response) => {
    try {
        await Quote.countDocuments({}).exec(function (error, count) {
            var random = Math.floor(Math.random() * count);
            Quote.findOne().skip(random).exec(function (error, quote) {
                response.status(200).json(quote);

                console.log("Request is hitted");
            });
        });
    } catch (error) {
        return error;
    }

});

//Routes to find as per author's name
app.get("/quotes/author/:authorName", async (request, response) => {
    try {
        let count = await Quote.countDocuments({
            quoteAuthor: request.params.authorName
        });
        await Quote.find({
            quoteAuthor: request.params.authorName
        }, (error, quotes) => {
            if (error) {
                console.log(error);
                response.status(404).json({
                    // The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.
                    status: 404,
                    message: "The server can not find requested resource."

                });
            } else {
                response.status(200).json({
                    count: count,
                    results: quotes
                });
            }
        });
    } catch (error) {
        return error;
    }

});

app.get("/quotes/search/:query", async (request, response) => {
    try {
        let query = request.params.query;
        let count = await Quote.countDocuments({

            "quoteText": {
                $regex: query,
                $options: 'i'
            }

        });
        await Quote.find({
            "quoteText": new RegExp(request.params.query, 'ig')

        }, (error, quotes) => {
            if (error) {
                response.status(400).json({
                    status: 404,
                    message: "The server can not find request resource."
                });
            } else {
                response.status(200).json({
                    count: count,
                    results: quotes
                });
            }
        });
    } catch (error) {
        return error;
    }
});

//Route for matching text in quote


//Get all quotes
app.get("/quotes/all", async (request, response) => {
    try {
        let count = await Quote.countDocuments({});
        await Quote.find({}, (error, quotes) => {
            if (error) {
                console.log(error);
                response.status(404).json({
                    // The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.
                    status: 404,
                    message: "The server can not find requested resource."
                });
            } else {
                response.status(200).json({
                    count: count,
                    results: quotes
                });
            }
        });
    } catch (error) {
        return error;
    }

});


app.post("/quotes/new", async (request, response) => {
    try {
        await Quote.create({
            quoteAuthor: request.body.inputAuthor,
            quoteText: request.body.inputText
        }, (error, quote) => {
            if (error) {
                console.log(error);
            } else {
                response.status(201).json({
                    status: 201,
                    message: "The request has succeeded and a new resource has been created as a result."
                })
            }
        });
    } catch (error) {
        return error;
    }

});

// Handle unknown routes
app.get("*", (request, response) => {
    response.status(404).render("error");
});

//Start server
app.listen(app.get('port'), () => {
    console.log("Server running on port : " + app.get('port'))
    console.log("Request is hitted");
});