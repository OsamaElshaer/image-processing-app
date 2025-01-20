const { Pool } = require("pg");
const {
    dbHost,
    postgresUser,
    postgresPassword,
    databaseName,
    dbPort,
} = require("../config/env");
const { logger } = require("../utils/logger");

const pool = new Pool({
    user: postgresUser,
    host: dbHost,
    database: databaseName,
    password: postgresPassword,
    port: dbPort,
});
pool.on("connect", () => {
    logger.info("Connected to PostgreSQL database successfully");
});
pool.on("error", (err) => {
    logger.error("Unexpected error on idle client", err);
    process.exit(-1);
});

module.exports = pool;
