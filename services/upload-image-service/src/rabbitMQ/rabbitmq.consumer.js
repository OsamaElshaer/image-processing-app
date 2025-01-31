const { getChannel } = require("../loaders/rabbitmq.js");
const { logger } = require("../utils/logger.js");

async function consumeImageMessages(queue) {
    try {
        const channel = getChannel();
        logger.info(`Waiting for messages in ${queue}`);

        await channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const image = JSON.parse(msg.content.toString());
                logger.info(image);
                channel.ack(msg);
            }
        });
    } catch (error) {
        logger.error("Error consuming messages: ", error);
    }
}

module.exports = { consumeImageMessages };
