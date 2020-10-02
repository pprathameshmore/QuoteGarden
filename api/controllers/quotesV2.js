const Quote = require("../models/quote");
const redisClient = require("../configs/redisConfig");
const { response, documentCount } = require("../utils/utils");
/*
V2 controllers
*/
exports.v2Random = async (req, res, next) => {
  try {
    const count = await documentCount(Quote);
    const random = Math.floor(Math.random() * count);
    Quote.findOne()
      .skip(random)
      .then((quote) => {
        return res.status(200).json({
          statusCode: 200,
          quote: quote,
        });
      });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error,
    });
  }
};

exports.searchByAuthor = async (req, res, next) => {
  try {
    const { authorName } = req.params;
    let { page = 1, limit = 10 } = req.query;
    const currentPage = parseInt(page);
    const pageLimit = parseInt(limit);
    const totalDocCount = await documentCount(Quote);
    Quote.find({ quoteAuthor: new RegExp(authorName, "ig") })
      .skip(pageLimit * currentPage - pageLimit)
      .limit(pageLimit)
      .then((quotes) => {
        const total = Math.ceil(totalDocCount / pageLimit);
        const redisStoreId = authorName + "-" + page + "-" + limit;
        const sendResponse = response({
          statusCode: 200,
          message: `Quotes by ${authorName}`,
          totalPages: total,
          currentPage: currentPage,
          quotes,
        });
        //Store in cache
        redisClient.setex(
          redisStoreId,
          120,
          JSON.stringify(sendResponse),
          (err, reply) => {
            if (err) {
              console.log(err);
            }
            console.log(reply);
          }
        );
        return res.status(200).json(sendResponse);
      });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error,
    });
  }
};

exports.searchByQuote = async (req, res, next) => {
  try {
    const { searchQuery } = req.params;
    let { page = 1, limit = 10 } = req.query;
    const currentPage = parseInt(page);
    const pageLimit = parseInt(limit);
    const totalDocCount = await documentCount(Quote);
    Quote.find({ quoteText: new RegExp(searchQuery, "ig") })
      .skip(pageLimit * currentPage - pageLimit)
      .limit(pageLimit)
      .then((quotes) => {
        const redisStoreId = searchQuery + "-" + page + "-" + limit;
        const total = Math.ceil(totalDocCount / pageLimit);
        const sendResponse = response({
          statusCode: 200,
          message: `Quotes which includes ${searchQuery} keywords `,
          totalPages: total,
          currentPage: page,
          quotes: quotes,
        });

        redisClient.setex(
          redisStoreId,
          120,
          JSON.stringify(sendResponse),
          (err, reply) => {
            if (err) {
              console.log(err);
            }
            console.log(reply);
          }
        );
        return res.status(200).json(sendResponse);
      });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error,
    });
  }
};

exports.searchByGenre = async (req, res, next) => {
  try {
    const { genreName } = req.params;
    let { page = 1, limit = 10 } = req.query;
    const currentPage = parseInt(page);
    const pageLimit = parseInt(limit);
    const totalDocCount = await documentCount(Quote);
    Quote.find({ quoteGenre: new RegExp(genreName, "ig") })
      .skip(pageLimit * currentPage - pageLimit)
      .limit(pageLimit)
      .then((quotes) => {
        const redisStoreId = genreName + "-" + page + "-" + limit;
        const total = Math.ceil(totalDocCount / pageLimit);
        const sendResponse = response({
          statusCode: 200,
          message: `Quotes in ${genreName} genre`,
          totalPages: total,
          currentPage: page,
          quotes: quotes,
        });
        redisClient.setex(
          redisStoreId,
          120,
          JSON.stringify(sendResponse),
          (err, reply) => {
            if (err) {
              console.log(err);
            }
            console.log(reply);
          }
        );
        return res.status(200).json(sendResponse);
      });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error,
    });
  }
};

exports.allGenres = async (req, res, next) => {
  try {
    Quote.distinct('quoteGenre')
      .then((genres) => {
        return res.status(200).json({
          statusCode: 200,
          genres: genres,
        });
      });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error,
    });
  }
};

exports.allQuotes = async (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  const totalDocCount = await documentCount(Quote);
  Quote.find()
    .limit(limit * 1)
    .skip(page - 1)
    .then((quotes) => {
      const total = Math.ceil(totalDocCount / limit);
      const redisStoreId = "quote" + "-" + page + "-" + limit;
      const sendResponse = response({
        statusCode: 200,
        message: "All quotes",
        totalPages: total,
        currentPage: page,
        quotes: quotes,
      });
      redisClient.setex(
        redisStoreId,
        120,
        JSON.stringify(sendResponse),
        (err, reply) => {
          if (err) {
            console.log(err);
          }
          console.log(reply);
        }
      );
      return res.status(200).json(sendResponse);
    })
    .catch((error) => {
      console.log(error);
    });
};
