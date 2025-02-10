const { getChannel, assertQueue } = require("../loaders/rabbitmq.js");
const { logger } = require("../utils/logger.js");

async function sendImageMessage(image) {
    try {
        const channel = getChannel();

        await channel.sendToQueue(
            "processed-image",
            Buffer.from(JSON.stringify(image)),
            {
                persistent: true,
            }
        );

        logger.info(
            `processed image message sent to RabbitMQ in queue ${"processed-image"}`,
            image
        );
    } catch (error) {
        logger.error(
            "Error sending processes image message to RabbitMQ:",
            error
        );
    }
}

module.exports = sendImageMessage;
