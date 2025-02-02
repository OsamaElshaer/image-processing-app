const app = require("./loaders/app");
const { logger } = require("./utils/logger");
const { port } = require("../src/config/env");
const { connectRabbitMQ } = require("../src/loaders/rabbitmq");
const client = require("./loaders/postgres");
const redisClient = require("./config/redis");
const { consumeImageMessages } = require("./rabbitMQ/rabbitmq.consumer");

async function startServer() {
    try {
        await client.connect();
        await redisClient.connect();

        await connectRabbitMQ();
        await consumeImageMessages("processed-image");
        app.listen(port, () => {
            logger.log(
                "info",
                `upload-image-service is running on port ${port}`
            );
        });
    } catch (error) {
        logger.error(error.message);
        process.exit(1);
    }
}
startServer();
