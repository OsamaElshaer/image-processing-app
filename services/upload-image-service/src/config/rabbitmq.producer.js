const { getChannel } = require("../loaders/rabbitmq.js"); 
const { logger } = require("../utils/logger.js");

async function sendSignupMessage(image) {
    try {
        const channel = getChannel();
        const queue = "uploaded-image";

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(image)), {
            persistent: true,
        });

        logger.info("uploaded image message sent to RabbitMQ", image);
    } catch (error) {
        logger.error(
            "Error sending uploaded image message to RabbitMQ:",
            error
        );
    }
}

module.exports = sendSignupMessage;
