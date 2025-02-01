const express = require("express");
const app = express();
const { errorHandlerGlobal } = require("../middlewares/errorHandlerGlobal");
const { notFound404 } = require("../middlewares/notFound404");
const morgan = require("morgan");
const { logger } = require("../utils/logger");
const path = require("path");
//////////////////////////////////////////////////////////////////////////////////////////////
let loggerStream = {
    write: (msg) => {
        return logger.info(msg);
    },
};
app.use(morgan("tiny", { stream: loggerStream }));

//////////////////////////////////////////////////////////////////////////////////////////////
app.use(
    "/processed",
    express.static(path.join(__dirname, "..", "..", "output"))
);

app.all("*", notFound404);
app.use(errorHandlerGlobal);

module.exports = app;
