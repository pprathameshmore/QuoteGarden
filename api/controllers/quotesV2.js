const Quote = require("../models/quote");
const redisClient = require("../configs/redisConfig");
const getDocCount = require("../helpers/getTotalDocCount");
/*

V2 controllers

*/

function generateResponse(statusCode, totalPages, currentPage, quotes) {
  return {
    statusCode: statusCode,
    totalPages: totalPages,
    currentPage: currentPage,
    quotes: quotes,
  };
}

exports.v2Random = async (req, res, next) => {
  try {
    const { genre } = req.query;

    const count = await getDocCount.getDocCount();
    const random = Math.floor(Math.random() * count);

    Quote.findOne()
      .skip(random)
      .then((quote) => {
        console.log(quote);
        if (quote) {
          return res.status(200).json({
            statusCode: 200,
            quote: quote,
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          statusCode: 500,
          message: error,
        });
      });
  } catch (error) {
    console.error(error);
  }
};

exports.searchByAuthor = async (req, res, next) => {
  try {
    const { authorName } = req.params;
    let { page = 1, limit = 10 } = req.query;

    const currentPage = parseInt(page);
    const pageLimit = parseFloat(limit);

    const totalDocCount = await getDocCount.getDocCount();

    if (authorName) {
      await Quote.find({ quoteAuthor: new RegExp(authorName, "ig") })
        .skip(pageLimit * currentPage - pageLimit)
        .limit(pageLimit)
        .then((quotes) => {
          if (quotes) {
            const total = Math.ceil(totalDocCount / pageLimit);

            const redisStoreId = authorName + "-" + page + "-" + limit;

            const response = generateResponse(
              200,
              total,
              parseInt(page),
              quotes
            );

            //Store in cache
            redisClient.setex(
              redisStoreId,
              120,
              JSON.stringify(response),
              (err, reply) => {
                if (err) {
                  console.log(err);
                }
                console.log(reply);
              }
            );
            return res.status(200).json(response);
          }
          return res.status(404).json({
            statusCode: 404,
            message: "Quote not found",
          });
        });
    }
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
    let { author, genre, page = 1, limit = 10 } = req.query;

    const currentPage = parseInt(page);
    const pageLimit = parseFloat(limit);

    const totalDocCount = await getDocCount.getDocCount();

    if (searchQuery) {
      await Quote.find({ quoteText: new RegExp(searchQuery, "ig") })
        .skip(pageLimit * currentPage - pageLimit)
        .limit(pageLimit)
        .then((quotes) => {
          if (quotes) {
            const redisStoreId = searchQuery + "-" + page + "-" + limit;

            const total = Math.ceil(totalDocCount / pageLimit);

            const response = generateResponse(
              200,
              total,
              parseInt(page),
              quotes
            );

            redisClient.setex(
              redisStoreId,
              120,
              JSON.stringify(response),
              (err, reply) => {
                if (err) {
                  console.log(err);
                }
                console.log(reply);
              }
            );

            return res.status(200).json(response);
          }
          return res.status(404).json({
            statusCode: 404,
            message: "Quotes not found",
          });
        });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error,
    });
  }
};

exports.searchByGenre = async (req, res, next) => {
  try {
    const { searchQuery } = req.params;
    let { author, genre, page = 1, limit = 10 } = req.query;

    const currentPage = parseInt(page);
    const pageLimit = parseInt(limit);

    const totalDocCount = await getDocCount.getDocCount();

    if (searchQuery) {
      await Quote.find({ quoteGenre: new RegExp(searchQuery, "ig") })
        .skip(pageLimit * currentPage - pageLimit)
        .limit(pageLimit)
        .then((quotes) => {
          if (quotes) {
            const redisStoreId = searchQuery + "-" + page + "-" + limit;

            const total = Math.ceil(totalDocCount / pageLimit);

            const response = generateResponse(
              200,
              total,
              parseInt(page),
              quotes
            );

            redisClient.setex(
              redisStoreId,
              120,
              JSON.stringify(response),
              (err, reply) => {
                if (err) {
                  console.log(err);
                }
                console.log(reply);
              }
            );

            return res.status(200).json(response);
          }
          return res.status(404).json({
            statusCode: 404,
            message: "Quotes not found",
          });
        });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error,
    });
  }
};

exports.allQuotes = async (req, res, next) => {
  let { page = 1, limit = 10, genre } = req.query;

  const totalDocCount = await getDocCount.getDocCount();

  await Quote.find()
    .limit(limit * 1)
    .skip(page - 1)
    .then((allQuotes) => {
      if (allQuotes) {
        const total = Math.ceil(totalDocCount / limit);

        const redisStoreId = "quote" + "-" + page + "-" + limit;

        const response = generateResponse(
          200,
          total,
          parseInt(page),
          allQuotes
        );

        redisClient.setex(
          redisStoreId,
          120,
          JSON.stringify(response),
          (err, reply) => {
            if (err) {
              console.log(err);
            }
            console.log(reply);
          }
        );

        return res.status(200).json(response);
      }
      return res.status(404).json({
        statusCode: 404,
        message: "Quotes not found",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getSingleQuote = async (req, res, next) => {
  try {
    const { quote_id } = req.params;
    await Quote.findById(quote_id).then((quote) => {
      const response = generateResponse(200, 0, 0, quote);
      return res.status(200).json(response);
    });
  } catch (error) {
    console.error(error);
  }
};
