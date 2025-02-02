const { getChannel } = require("../loaders/rabbitmq.js");
const { updateImageById } = require("../models/image.model.js");
const { logger } = require("../utils/logger.js");
const redisClient  = require("../config/redis.js");

async function consumeImageMessages(queue) {
    try {
        const channel = getChannel();
        logger.info(`Waiting for messages in ${queue}`);

        await channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const image = JSON.parse(msg.content.toString());
                const { userId, imageId, imageStatus, imagePath } = image;
                const id = `${userId}-${imageId}`;
                try {
                    await updateImageById(imageId, imageStatus, imagePath);
                    let success = false;
                    for (let i = 0; i < 3; i++) {
                        try {
                            await redisClient.set(
                                `image:${id}`,
                                JSON.stringify({
                                    processed_path: imagePath || null,
                                    status: imageStatus,
                                }),
                                "EX",
                                600
                            );
                            success = true;
                            break;
                        } catch (redisError) {
                            logger.error(
                                `Redis attempt ${
                                    i + 1
                                } failed for image ${id}:`,
                                redisError
                            );
                        }
                    }

                    if (!success) {
                        logger.error(
                            `Redis update failed for image, message will NOT be acked.`
                        );
                        return;
                    }

                    channel.ack(msg);
                } catch (error) {
                    logger.error(`Error processing image`, error);
                }
            }
        });
    } catch (error) {
        logger.error("Error consuming messages: ", error);
    }
}

module.exports = { consumeImageMessages };
