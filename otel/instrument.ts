import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

import {
    PeriodicExportingMetricReader,
    ConsoleMetricExporter,
} from "@opentelemetry/sdk-metrics"

const sdk = new NodeSDK({
    traceExporter: new ConsoleSpanExporter(),
    instrumentations: [getNodeAutoInstrumentations(
        {
            "@opentelemetry/instrumentation-express":{
                enabled: true
            }
        }
    )],
    metricReader: new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter(),
    }),
});

sdk.start();
