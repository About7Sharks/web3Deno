// this scripts get the price of currencies from chainlink
// logs it to the console
import Web3 from 'https://deno.land/x/web3/mod.ts'
import { link } from "./link.js";
import {coins} from "./coinList.js";
// connect to the evm chain
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.68.101:8545'))
// Eth/Mim Chainlink contract instance

// promise all to get all the prices
let promises = coins.map(async (coin)=>{
    let contract = new web3.eth.Contract(link, coin.contract)
    let price = ((await contract.methods.latestAnswer().call())/10**(await contract.methods.decimals().call())).toFixed(3)
    return {
        ...coin,
        price
    }
})
console.table(await Promise.all(promises))
