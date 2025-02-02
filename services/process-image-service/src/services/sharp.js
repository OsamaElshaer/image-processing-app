const sharp = require("sharp");
const path = require("path");
const downloadImage = require("./downloadImage");
const { logger } = require("../utils/logger");
const sendImageMessage = require("../rabbitMQ/rabbitmq.producer");
const { removeImages } = require("../utils/removeFiles");
const { host, port, protocol } = require("../config/env");

class OptionValidator {
    static validateResizeOptions(options) {
        if (!options.width || !options.height) {
            throw new Error("Resize requires 'width' and 'height'.");
        }
    }

    static validateCropOptions(options) {
        const { left, top, cropWidth, cropHeight } = options;
        if (!left || !top || !cropWidth || !cropHeight) {
            throw new Error(
                "Crop requires 'left', 'top', 'cropWidth', and 'cropHeight'."
            );
        }
    }

    static validateConvertOptions(options) {
        if (!["jpeg", "png", "webp", "tiff"].includes(options.format)) {
            throw new Error(
                "Invalid format. Supported formats: 'jpeg', 'png', 'webp', 'tiff'."
            );
        }
    }

    static validateCompressOptions(options) {
        if (!options.quality || options.quality < 1 || options.quality > 100) {
            throw new Error("Compress requires 'quality' between 1 and 100.");
        }
    }
}

class ImageProcessor {
    constructor(imagePath) {
        this.image = sharp(imagePath);
    }

    resize(width, height) {
        this.image = this.image.resize(width, height);
    }

    crop({ left, top, cropWidth, cropHeight }) {
        this.image = this.image.extract({
            width: cropWidth,
            height: cropHeight,
            left,
            top,
        });
    }

    convert(format) {
        this.image = this.image.toFormat(format);
    }

    grayscale() {
        this.image = this.image.grayscale();
    }

    compress(quality) {
        this.image = this.image.jpeg({ quality });
    }

    async save(outputPath) {
        await this.image.toFile(outputPath);
    }
}

class ImageProcessingService {
    static async processImage({ imageUrl, process_option, imageId, userId }) {
        if (!imageUrl || !process_option) {
            throw new Error(
                "Both 'imageUrl' and 'process_option' are required."
            );
        }
        const imageName = path.basename(imageUrl);
        const downloadDir = path.join(__dirname, "..", "..", "downloaded");
        const fileName = `processed-${Date.now()}-${imageName}`;
        const outputDir = path.join(__dirname, "..", "..", "output", fileName);

        const downloadedImagePath = await downloadImage(
            imageUrl,
            downloadDir,
            imageName
        );
        const processor = new ImageProcessor(downloadedImagePath);
        try {
            for (const option of process_option) {
                switch (option.type) {
                    case "resize":
                        OptionValidator.validateResizeOptions(option);
                        processor.resize(option.width, option.height);
                        break;

                    case "crop":
                        OptionValidator.validateCropOptions(option);
                        processor.crop(option);
                        break;

                    case "convert":
                        OptionValidator.validateConvertOptions(option);
                        processor.convert(option.format);
                        break;

                    case "grayscale":
                        processor.grayscale();
                        break;

                    case "compress":
                        OptionValidator.validateCompressOptions(option);
                        processor.compress(option.quality);
                        break;

                    default:
                        throw new Error(
                            `Unsupported process_option type: ${option.type}`
                        );
                }
            }
            await processor.save(outputDir).then(async () => {
                await sendImageMessage({
                    userId,
                    imageId,
                    imageStatus: "completed",
                    imagePath: `${protocol}://${host}:${port}/processed/${fileName}`,
                });
                removeImages(downloadDir, imageName);
                logger.info(` processed image saved to ${outputDir}`);
                return outputDir;
            });
        } catch (error) {
            throw new Error(`Image processing failed: ${error.message}`);
        }
    }
}

module.exports = { ImageProcessingService };
