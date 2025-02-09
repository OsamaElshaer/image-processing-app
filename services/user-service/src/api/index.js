const express = require("express");
const { authRouter } = require("./routes/auth.routes");
const router = express.Router();

router.use("/users", authRouter);

module.exports = router;
