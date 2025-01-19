const { deleteImage, getImageUrl } = require("../services/image.service");

exports.uploadImage = (req, res, next) => {
    try {
        res.status(200).json({
            message: "Image uploaded successfully!",
            imageUrl: `/uploads/${req.file.filename}`,
        });
    } catch (error) {
        next(error);
    }
};

exports.getImage = async (req, res) => {
    try {
        const { filename } = req.params;
        const url = await getImageUrl(filename);
        res.status(200).json({ url });
    } catch (error) {
        next(error);
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { filename } = req.params;
        await deleteImage(filename);
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        next(error);
    }
};
