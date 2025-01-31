const app = require("./loaders/app");
const { logger } = require("./utils/logger");
const { port } = require("../src/config/env");
const { connectRabbitMQ } = require("../src/loaders/rabbitmq");
const { consumeImageMessages } = require("./rabbitMQ/rabbitmq.consumer");
const client = require("./loaders/postgres");

async function startServer() {
    try {
        await client.connect();
        await connectRabbitMQ();
        await consumeImageMessages("uploaded-image");

        app.listen(port, () => {
            logger.log(
                "info",
                `process-image-service is running on port ${port}`
            );
        });
    } catch (error) {
        logger.error(error.message);
        process.exit(1);
    }
}
startServer();
