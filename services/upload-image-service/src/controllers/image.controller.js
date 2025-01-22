const { validationResult, body } = require("express-validator");
const sendImageMessage = require("../config/rabbitmq.producer");
const { create } = require("../models/image.model");
const { getImageByHash } = require("../services/image.service");
const generateImageHash = require("../utils/imageHash");

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
        let image = {
            userId,
            fileName,
            imageUrl: `${req.protocol}://${req.get(
                "host"
            )}/uploads/${fileName}`,
            status: "uploaded",
            imageHash,
        };
        const existingImage = await getImageByHash(imageHash);

        if (existingImage) {
            return res.status(400).json({
                message: "Image already exists!",
            });
        }

        await create(image);
        await sendImageMessage({ imageUrl: image.imageUrl, process_option });

        res.status(200).json({
            message: "Image uploaded successfully!",
            imageUrl: image.imageUrl,
        });
    } catch (error) {
        next(error);
    }
};
