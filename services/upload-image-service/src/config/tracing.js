const { NodeSDK } = require("@opentelemetry/sdk-node");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const {
    getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { Resource } = require("@opentelemetry/resources");
const {
    SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const { logger } = require("../utils/logger");
const { serviceName } = require("./env");
const SERVICE_NAME = serviceName || "upload-image-service";

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: SERVICE_NAME,
    }),
    traceExporter: new JaegerExporter({
        endpoint: "http://jaeger:14268/api/traces",
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
logger.info(`Tracing initialized for service: ${SERVICE_NAME}`);

process.on("SIGTERM", async () => {
    logger.info("Shutting down tracing...");
    await sdk.shutdown();
    logger.info("Tracing shutdown complete.");
    process.exit(0);
});
