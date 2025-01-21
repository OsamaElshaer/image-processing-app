// express
const express = require("express");

const app = express();

//npm packges
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
//require from modules
const { whiteList } = require("../config/env");
const { errorHandlerGlobal } = require("../middlewares/errorHandlerGlobal");
const { notFound404 } = require("../middlewares/notFound404");
const { authRouter } = require("../routes/auth.routes");
const swagger = require("../config/swagger");
const { logger } = require("../utils/logger");

// -----------------------------------------Middleware-----------------------------------------------------------

//parses the incoming JSON request body into a JavaScript object.
app.use(express.json());
// using the querystring library, which supports parsing simple form submissions. If you need to parse nested objects or arrays from the form data, you can set extended: true to use the qs library instead.
app.use(express.urlencoded({ extended: true }));

// cors
const corsOptions = {
    origin: whiteList,
};
app.use(cors({ origin: "*" }));

//protect against HTTP Parameter Pollution attacks
app.use(hpp());

//Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

//limit requests rate
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after an 15 min",
});
app.use(limiter);

//logging
let loggerStream = {
    write: (msg) => {
        return logger.info(msg);
    },
};
app.use(morgan("tiny", { stream: loggerStream }));

// -----------------------------------------Routes---------------------------------------------------------------
swagger(app);

app.use("/users", authRouter);

// ---------------------------------------------------------------------------------------------------------------

//handling express errors

app.all("*", notFound404);

app.use(errorHandlerGlobal);

// ---------------------------------------------------------------------------------------------------------------

module.exports = app;
