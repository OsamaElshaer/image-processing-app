const dotenv = require("dotenv");
dotenv.config();
const { PORT, STORAGE_TYPE, UPLOAD_DIR, MAX_FILE_SIZE, JWT_SECRET_KEY } =
    process.env;

module.exports = {
    port: PORT,
    storageType: STORAGE_TYPE,
    uploadDir: UPLOAD_DIR,
    maxFileSize: MAX_FILE_SIZE,
    jwtSecretKey: JWT_SECRET_KEY,
};
