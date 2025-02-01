const { validationResult, body } = require("express-validator");
const sendImageMessage = require("../rabbitMQ/rabbitmq.producer");
const { consumeImageMessage } = require("../rabbitMQ/rabbitmq.consumer");
const { create, getImageById } = require("../models/image.model");
const { getImageByHash } = require("../services/image.service");
const generateImageHash = require("../utils/imageHash");
const path = require("path");
const { port, host } = require("../config/env");

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

        const image = await getImageById(imageId);
        if (!image) {
            return res
                .status(404)
                .json({ success: false, message: "Image Does not Exist" });
        }
        if (image.status === "failed") {
            throw new Error("Image processing failed.");
        }

        const consumedMessage = await consumeImageMessage(
            "processed-image",
            userId.toString(),
            imageId
        );
        console.log(consumedMessage);
        if (!consumedMessage) {
            return res.status(404).json({
                success: false,
                message:
                    "No matching message found for the given userId and imageId.",
            });
        }

        return res.status(200).json({
            success: true,
            imageStatus: consumedMessage.imageStatus,
            imagePath: consumedMessage.imagePath,
        });
    } catch (error) {
        next(error);
    }
};

exports.downloadImage = async (req, res, next) => {};
