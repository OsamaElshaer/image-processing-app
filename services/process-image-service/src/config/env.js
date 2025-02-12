const dotEnv = require("dotenv");
dotEnv.config();

const {
    PORT,
    HOST,
    PROTOCOL,
    JWT_SECRET_KEY,
    SERVICE_NAME,
    NODE_ENV,
    JWT_SECRET,
    RABBITMQ_URL,
} = process.env;

module.exports = {
    port: PORT,
    host: HOST,
    protocol: PROTOCOL,
    jwtSecretKey: JWT_SECRET_KEY,
    nodeEnv: NODE_ENV,
    jwtSecretKey: JWT_SECRET,
    rabbitmqUrl: RABBITMQ_URL,
    serviceName: SERVICE_NAME,
};
