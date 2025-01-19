const app = require("./loaders/app");
const { logger } = require("./utils/logger");
const { port } = require("../src/config/env");
console.log(port);
app.listen(port, () => {
    logger.info(`upload image service is running in ${port}`);
});
