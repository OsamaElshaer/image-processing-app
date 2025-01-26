const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { logger } = require("../utils/logger");

/**
 * @param {string} imageUrl - The URL of the image to download.
 * @param {string} saveDir - The directory where the image should be saved.
 * @param {string} fileName - The name to save the image as.
 * @returns {Promise<void>} - Resolves when the image is downloaded and saved.
 */
async function downloadImage(imageUrl, saveDir, fileName) {
    try {
        const response = await axios({
            url: imageUrl,
            method: "GET",
            responseType: "stream",
        });

        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir, { recursive: true });
        }

        const filePath = path.join(saveDir, fileName);
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => {
                logger.info(`downloaded image saved to ${filePath}`);
                resolve(filePath);
            });
            writer.on("error", reject);
        });
    } catch (error) {
        logger.error(`Failed to download image: ${error.message}`);
        throw error;
    }
}
module.exports = downloadImage;
