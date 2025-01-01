import { api } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";

// activate SDK and Set ContextManager

const ctx1 = api.context.getActive()
const ctx2 = ctx1.setValue()

api.context.with(ctx1, () => {
    console.log(ctx2.getValue())
})