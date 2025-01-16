const express = require("express");
const { notFound404 } = require("../middlewares/notFound404");
const { errorHandlerGlobal } = require("../middlewares/errorHandlerGlobal");
const app = express();

app.all("*", notFound404);
app.use(errorHandlerGlobal);

module.exports = app;
