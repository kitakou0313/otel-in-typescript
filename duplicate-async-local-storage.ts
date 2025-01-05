import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage()

for (let index = 0; index < 5; index++) {
    const delayNumSecond = 5 * Math.random()

    setTimeout(() => {
        const str = `case-${index}-1`
        asyncLocalStorage.run(str, () => {
            const strInLevel1 = asyncLocalStorage.getStore()
            console.log(strInLevel1)
    
            const strInLevel2 = `${str}-2`
            asyncLocalStorage.run(strInLevel2, () => {
                const strInLevel2 = asyncLocalStorage.getStore()
                console.log(strInLevel2)
            })
        })
    }, delayNumSecond * 1000)
    
}
