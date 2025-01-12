const dotenv = require("dotenv");
dotenv.config();

const {
    PORT,
    DB_PORT,
    DB_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    DATABASE_NAME,
    WHITE_LIST,
} = process.env;

module.exports = {
    port: PORT,
    dbHost: DB_HOST,
    dbPort: DB_PORT,
    postgresUser: POSTGRES_USER,
    postgresPassword: POSTGRES_PASSWORD,
    databaseName: DATABASE_NAME,
    whiteList: WHITE_LIST,
};
