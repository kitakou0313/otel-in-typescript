import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage()

for (let index = 0; index < 5; index++) {
    // AsyncLocalStorage.run()の第一引数には各非同期処理で取得したい値を指定する
    asyncLocalStorage.run( index , () => {
        // AsyncLocalStorage.getStore()の返り値でAsyncLocalStorage.run()の第一引数に与えた値を取得できる
        // 値はrun実行時の時の値が得られる
        const indexInAsyncOperation = asyncLocalStorage.getStore()
        
        const delayNumMs = 5  * Math.random()
        console.log(`${indexInAsyncOperation}:start, delay is ${delayNumMs}`)

        setTimeout(() => {
            const indexInAsyncOperation = asyncLocalStorage.getStore()
            console.log(`${indexInAsyncOperation}:end`)
        },  delayNumMs * 1000);
    })

}
