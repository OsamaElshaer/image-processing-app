const express = require("express");
const router = express.Router();
const { imageRouter } = require("./routes/uploadImage.routes");
const { isAuth } = require("../middlewares/isAuth");

router.use("/images", isAuth, imageRouter);

module.exports = router;
