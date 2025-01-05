import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import {
    PeriodicExportingMetricReader,
    ConsoleMetricExporter,
} from "@opentelemetry/sdk-metrics"
import * as api from "@opentelemetry/api";

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

// api.context.withで引数に与えたcontextをactiveなcontext(api.context.active()の引数で返されるContextのインスタンス)として実行できる
// context.withの実装はContextManagerのwithを呼び出している
// ContextManagerのwithメソッド内部ではAsyncLocalStorage.runをcontextを引数にして呼びだしている
const ctx2 = api.context.active().setValue(key, "context 2")
api.context.with(ctx2, () => {
    // Active ContextはContext 2
    console.log(api.context.active().getValue(key))

    const ctx3 = api.context.active().setValue(key, "context 3")
    api.context.with(ctx3, () => {
        // Active ContextはContext 3
        console.log(api.context.active().getValue(key))
    })

    // context 2に戻っている
    console.log(api.context.active().getValue(key))
})
