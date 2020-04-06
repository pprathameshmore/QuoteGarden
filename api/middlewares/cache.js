const redisClient = require('../configs/redisConfig');

exports.isCached = (req, res, next) => {

    const { authorName, searchQuery } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const authorId = authorName + "-" + page + "-" + limit;
    const searchId = searchQuery + "-" + page + "-" + limit;

    //Check in redis
    redisClient.get(authorName ? authorId : searchId, (err, reply) => {
        if (err) {
            console.log(err);
        }

        if (reply) {
            const response = JSON.parse(reply)
            return res.status(200).json(response);
        } else {
            next();
        }
    });
}

exports.isCachedAll = (req, res, next) => {

    const { page = 1, limit = 10 } = req.query;

    const allId = "quote" + "-" + page + "-" + limit;

    redisClient.get(allId, (err, reply) => {
        if (err) {
            console.log(err);
        }

        if (reply) {
            const response = JSON.parse(reply);
            return res.status(200).json(response);
        } else {
            next();
        }

    });

}
