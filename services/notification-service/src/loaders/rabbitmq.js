const amqp = require("amqplib");
const { logger } = require("../utils/logger");
const { RABBITMQ_URL } = process.env;

let connection;
let channel;

async function connectRabbitMQ() {
    try {
        if (!RABBITMQ_URL) {
            throw new Error("RABBITMQ_URL is not defined");
        }
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue("user-signup", { durable: true });
        logger.info("RabbitMQ connection established");

        process.on("SIGINT", async () => {
            logger.info("SIGINT received, closing RabbitMQ connection...");
            await closeConnection();
            process.exit(0);
        });

        process.on("SIGTERM", async () => {
            logger.info("SIGTERM received, closing RabbitMQ connection...");
            await closeConnection();
            process.exit(0);
        });
    } catch (error) {
        logger.error("RabbitMQ connection error: ", error);
        process.exit(1);
    }
}

function getChannel() {
    if (!channel) {
        throw new Error("RabbitMQ channel is not connected.");
    }
    return channel;
}

async function assertQueue(queueName) {
    if (!channel) {
        throw new Error("Channel is not available");
    }
    await channel.assertQueue(queueName, { durable: true });
    logger.info(`Queue ${queueName} asserted`);
}

module.exports = { connectRabbitMQ, getChannel, assertQueue };
