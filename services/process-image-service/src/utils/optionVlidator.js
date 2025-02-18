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

module.exports = OptionValidator;
