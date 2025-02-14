const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
    getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { Resource } = require("@opentelemetry/resources");
const {
    OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-proto");
const {
    ATTR_SERVICE_NAME,
    ATTR_SERVICE_VERSION,
} = require("@opentelemetry/semantic-conventions");

const { logger } = require("../utils/logger");
const { serviceName } = require("./env");

const sdk = new NodeSDK({
    resource: new Resource({
        [ATTR_SERVICE_NAME]: serviceName,
        [ATTR_SERVICE_VERSION]: "0.1.0",
    }),
    traceExporter: new OTLPTraceExporter({
        url: "http://jaeger:4318/v1/traces",
        headers: {},
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
logger.info(`Tracing initialized for service: ${serviceName}`);

process.on("SIGTERM", async () => {
    logger.info("Shutting down tracing...");
    await sdk.shutdown();
    logger.info("Tracing shutdown complete.");
    process.exit(0);
});
