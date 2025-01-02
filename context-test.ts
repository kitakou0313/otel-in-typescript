import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import {
    PeriodicExportingMetricReader,
    ConsoleMetricExporter,
} from "@opentelemetry/sdk-metrics"
import * as api from "@opentelemetry/api";
import { log } from "console";

// activate SDK and Set ContextManager
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

const key = api.createContextKey('Key to store a value');
const ctx1 = api.context.active()

console.log(ctx1.getValue(key))

// api.context.withで引数に与えたcontextをactiveなcontextとして実行できる
// context.withの実装はContextManagerのwithを呼び出している
// ContextManagerのwithメソッド内部ではAsyncLocalStorage.runをcontextを引数にして呼びだしている
api.context.with(ctx1.setValue(key, "context2"), () => {
    console.log(api.context.active().getValue(key))

    api.context.with(ctx1.setValue(key, "context 3"), () => {
        console.log(api.context.active().getValue(key))
    })
    console.log(api.context.active().getValue(key))
})
