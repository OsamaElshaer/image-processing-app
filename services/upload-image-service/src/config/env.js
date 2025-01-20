const dotenv = require("dotenv");
dotenv.config();
const {
    PORT,
    STORAGE_TYPE,
    UPLOAD_DIR,
    MAX_FILE_SIZE,
    JWT_SECRET_KEY,
    DB_PORT,
    DB_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    DATABASE_NAME,
    NODE_ENV,
    JWT_SECRET,
} = process.env;

module.exports = {
    port: PORT,
    storageType: STORAGE_TYPE,
    uploadDir: UPLOAD_DIR,
    maxFileSize: MAX_FILE_SIZE,
    jwtSecretKey: JWT_SECRET_KEY,
    dbHost: DB_HOST,
    dbPort: DB_PORT,
    postgresUser: POSTGRES_USER,
    postgresPassword: POSTGRES_PASSWORD,
    databaseName: DATABASE_NAME,
    nodeEnv: NODE_ENV,
    jwtSecretKey: JWT_SECRET,
};
