const redis = require('redis');


//const redisPort = process.env.PORT || 6379;
/*
Redis connection
*/
const redisClient = redis.createClient('redis://redistogo:818dc14eb0456fc5bfec46df3e64edd2@pike.redistogo.com:10617/');
redisClient.on('error', (err) => {
    console.log(err);
});

module.exports = redisClient;