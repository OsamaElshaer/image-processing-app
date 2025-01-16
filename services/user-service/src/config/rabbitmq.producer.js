const { getChannel } = require("../loaders/rabbitmq.js"); // Import the loader to access RabbitMQ
const { logger } = require("../utils/logger.js");

async function sendSignupMessage(user) {
    try {
        const channel = getChannel();
        const queue = "user-signup";

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)), {
            persistent: true,
        });

        logger.info("User signup message sent to RabbitMQ", user);
    } catch (error) {
        logger.error("Error sending signup message to RabbitMQ:", error);
    }
}

module.exports = sendSignupMessage;
