const { getChannel, assertQueue } = require("../loaders/rabbitmq.js");
const { logger } = require("../utils/logger.js");

async function sendImageMessage(image) {
    try {
        const channel = getChannel();
        const queue = assertQueue("processed-image");

        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(image)), {
            persistent: true,
        });

        logger.info(
            `uploaded image message sent to RabbitMQ in queue ${queue}`,
            image
        );
    } catch (error) {
        logger.error(
            "Error sending uploaded image message to RabbitMQ:",
            error
        );
    }
}

module.exports = sendImageMessage;
