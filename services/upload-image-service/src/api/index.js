const express = require("express");
const router = express.Router();
const { imageRouter } = require("./routes/uploadImage.routes");
const { isAuth } = require("../middlewares/isAuth");

router.use("/images", imageRouter);

module.exports = router;
