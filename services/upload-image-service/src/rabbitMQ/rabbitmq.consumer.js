const { getChannel } = require("../loaders/rabbitmq.js");
const { logger } = require("../utils/logger.js");

async function consumeImageMessage(queue, userId, imageId) {
    const channel = await getChannel();
    logger.info(`Waiting for messages in queue: ${queue}`);

    const correlationId = `${userId}-${imageId}`;

    return new Promise(async (resolve, reject) => {
        try {
            let consumerTag = null;

            consumerTag = (
                await channel.consume(queue, async (msg) => {
                    if (msg === null) {
                        reject(new Error("Message is null"));
                        return;
                    }

                    try {
                        const image = JSON.parse(msg.content.toString());
                        console.log(image);
                        if (msg.properties.correlationId === correlationId) {
                            logger.info(
                                `Processed message for userId: ${userId}, imageId: ${imageId}`
                            );
                            channel.ack(msg); // Acknowledge only the valid message
                            resolve({
                                imageStatus: image.imageStatus,
                                imagePath: image.imagePath,
                            });

                            // After successfully finding the matching message, cancel the consumer
                            await channel.cancel(consumerTag);
                        } else {
                            logger.info(
                                `Skipping message for userId: ${image.userId}, imageId: ${image.imageId}`
                            );
                            channel.ack(msg); // Acknowledge other messages but don't resolve
                        }
                    } catch (error) {
                        logger.error("Failed to parse message content", error);
                        channel.nack(msg, false, false);
                        reject(new Error("Failed to parse message content"));
                    }
                })
            ).consumerTag;
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    consumeImageMessage,
};
