const { validationResult } = require("express-validator");
const sendImageMessage = require("../rabbitMQ/rabbitmq.producer");
const { create } = require("../models/image.model");
const { getImageByHash } = require("../services/image.service");
const generateImageHash = require("../utils/imageHash");
const path = require("path");
const { port, host } = require("../config/env");
const redisClient = require("../config/redis");
const { logger } = require("../utils/logger");

exports.uploadImage = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        let { process_option } = req.body;
        const userId = req.user.userId;
        const fileName = req.file.originalname;
        const imageHash = generateImageHash(userId, fileName);
        const fileExt = path.extname(fileName);

        let image = {
            userId,
            fileName,
            imageUrl: `${req.protocol}://${host}:${port}/uploads/${imageHash}${fileExt}`,
            status: "processing",
            imageHash,
        };
        const existingImage = await getImageByHash(imageHash);

        if (existingImage) {
            return res.status(400).json({
                message: "Image already exists!",
            });
        }

        const uploadedImage = await create(image);
        await sendImageMessage({
            userId,
            imageId: uploadedImage.image_id,
            imageUrl: image.imageUrl,
            process_option,
        });

        res.status(200).json({
            message: "Image uploaded successfully!",
            imagePath: image.imageUrl,
            imageId: uploadedImage.image_id,
        });
    } catch (error) {
        next(error);
    }
};

exports.statusImage = async (req, res, next) => {
    try {
        const { imageId } = req.query;
        const { userId } = req.user;
        const id = `${userId}-${imageId}`;
        const pollTimeout = 30000;
        const checkInterval = 2000;
        const startTime = Date.now();

        const checkStatus = async () => {
            const statusKey = `image:${id}`;

            try {
                const statusData = await redisClient.get(statusKey);

                if (statusData) {
                    const { status, processed_path } = JSON.parse(statusData);

                    if (status == "completed" || status == "failed") {
                        return res.status(200).json({
                            status,
                            imageUrl: processed_path || null,
                        });
                    }
                }
            } catch (error) {
                logger.error(`Error checking status for image ${id}:`, error);
            }

            if (Date.now() - startTime > pollTimeout) {
                return res.status(408).json({
                    message: "Request Timeout. Processing still ongoing.",
                });
            }

            setTimeout(checkStatus, checkInterval);
        };
        checkStatus();
    } catch (error) {
        next(error);
    }
};

exports.downloadImage = async (req, res, next) => {};
