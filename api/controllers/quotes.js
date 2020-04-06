const Quote = require('../models/quote');

exports.random = async (request, response) => {
    try {
        await Quote.countDocuments({}).exec(function (error, count) {
            var random = Math.floor(Math.random() * count);
            Quote.findOne().skip(random).exec(function (error, quote) {
                response.status(200).json(quote);
            });
        });
    } catch (error) {
        return error;
    }
}

exports.author_name = async (request, response) => {
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

}

exports.search_query = async (request, response) => {
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
}

exports.get_all_quotes = async (request, response) => {
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

}

exports.create_new_quote = async (request, response) => {
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

}
