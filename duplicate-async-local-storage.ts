import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>()

const KEY = "key"

for (let index = 0; index < 5; index++) {
    const delayNumSecond = 5 * Math.random()

    // 非同期処理毎にMapを生成する
    const mapPerAsyncOpe = new Map<string, string>()
    mapPerAsyncOpe.set(KEY, `in Operation with loop-${index}`)
    // AsyncLocalStorage.runに引数として渡すことで，Callback関数の処理内で一貫してgetStoreメソッドによってそのMapを利用できる
    asyncLocalStorage.run(mapPerAsyncOpe, () => {
        setTimeout(() => {
            const mapInsideAsyncOpe = asyncLocalStorage.getStore() as Map<string, string>
            console.log(mapInsideAsyncOpe.get(KEY))

            // Callback関数内から実行された非同期処理内でも同じMapを利用できる
            setTimeout(() => {
                const mapInsideAsyncOpe = asyncLocalStorage.getStore() as Map<string, string>
                console.log(mapInsideAsyncOpe.get(KEY))
            })

        }, delayNumSecond * 1000)
    })
}
