const { getChannel } = require("../loaders/rabbitmq.js");
const { logger } = require("../utils/logger.js");
const { sendEmail } = require("../controllers/sendingMails.js");
const { signUpTemplate } = require("../utils/mailMessage.js");

async function consumeSignupMessages() {
    try {
        const channel = getChannel();
        const queue = "user-signup";

        await channel.assertQueue(queue, { durable: true });

        logger.info(`Waiting for messages in ${queue}`);

        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const user = JSON.parse(msg.content.toString());
                logger.info("Received message: ", user);

                const subject = "Welcome to Our Application!";
                const html = signUpTemplate(user.email);

                await sendEmail(user.email, subject, html);

                channel.ack(msg);
            }
        });
    } catch (error) {
        logger.error("Error consuming messages: ", error);
    }
}

module.exports = { consumeSignupMessages };
