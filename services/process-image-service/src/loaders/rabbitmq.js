const amqp = require("amqplib");
const { logger } = require("../utils/logger");
const { rabbitmqUrl } = require("../config/env");

let connection;
let channel;

async function connectRabbitMQ() {
    try {
        if (!rabbitmqUrl) {
            throw new Error("RABBITMQ_URL is not defined");
        }
        const queue = "processed-image";
        connection = await amqp.connect(rabbitmqUrl);
        channel = await connection.createChannel();
        await assertQueue(queue, { durable: true });
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

async function closeConnection() {
    try {
        if (channel) {
            await channel.close();
            logger.info("Channel closed");
        }
        if (connection) {
            await connection.close();
            logger.info("Connection closed");
        }
    } catch (error) {
        logger.error("Error during connection closure: ", error);
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

module.exports = { connectRabbitMQ, getChannel, assertQueue, closeConnection };
