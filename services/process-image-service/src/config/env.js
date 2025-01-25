const dotEnv = require("dotenv");
dotEnv.config();
const {
    PORT,
    JWT_SECRET_KEY,
    DB_PORT,
    DB_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    DATABASE_NAME,
    NODE_ENV,
    JWT_SECRET,
    RABBITMQ_URL,
} = process.env;

module.exports = {
    port: PORT,
    jwtSecretKey: JWT_SECRET_KEY,
    dbHost: DB_HOST,
    dbPort: DB_PORT,
    postgresUser: POSTGRES_USER,
    postgresPassword: POSTGRES_PASSWORD,
    databaseName: DATABASE_NAME,
    nodeEnv: NODE_ENV,
    jwtSecretKey: JWT_SECRET,
    rabbitmqUrl: RABBITMQ_URL,
};
