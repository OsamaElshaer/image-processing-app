const redis = require("redis");
const { redisPort, redisHost } = require("./env");
const { logger } = require("../utils/logger");
const client = redis.createClient({
    socket: {
        host: redisHost,
        port: redisPort,
    },
});
client.on("error", (err) => {
    logger.info("Redis error: ", err);
});

client.on("connect", () => {
    logger.info("Connected to Redis");
});
module.exports = client;
