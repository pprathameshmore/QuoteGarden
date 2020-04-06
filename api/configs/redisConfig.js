const redis = require('redis');


const redisPort = process.env.PORT || 6379;
/*
Redis connection
*/
const redisClient = redis.createClient(process.env.REDIS);
redisClient.on('error', (err) => {
    console.log(err);
});

module.exports = redisClient;