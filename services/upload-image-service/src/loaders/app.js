const express = require("express");
const app = express();
app.use("/uploads", express.static("uploads"));
const { errorHandlerGlobal } = require("../middlewares/errorHandlerGlobal");
const { notFound404 } = require("../middlewares/notFound404");
const router = require("../api/index");
const morgan = require("morgan");
const { logger } = require("../utils/logger");

///////////////////////////////////////////////////////////////////////////////////////////

let loggerStream = {
    write: (msg) => {
        return logger.info(msg);
    },
};
app.use(morgan("tiny", { stream: loggerStream }));

//////////////////////////////////////////////////////////////////////////////////////////////
app.use("/api", router);
app.all("*", notFound404);
app.use(errorHandlerGlobal);

module.exports = app;
