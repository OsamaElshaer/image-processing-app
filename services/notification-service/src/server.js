require("./config/tracing");
const { port } = require("./config/env");
const { consumeSignupMessages } = require("./controllers/rabbitmq.consumer");
const app = require("./loaders/app");
const { connectRabbitMQ } = require("./loaders/rabbitmq");
const { logger } = require("./utils/logger");

async function startServer() {
    try {
        await connectRabbitMQ();
        await consumeSignupMessages();
        app.listen(port, () => {
            logger.log(
                "info",
                `notification-service is running on port ${port}`
            );
        });
    } catch (error) {
        logger.error(error.message);
    }
}

startServer();
