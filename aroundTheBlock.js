// This software is useful for testing evm chains.
// It uses the ethereum docker on localhost to connect to the blockchain.
// It uses the ethereum client to interact with the blockchain.

import Web3 from 'https://deno.land/x/web3/mod.ts'
let web3 = new Web3(
  new Web3.providers.HttpProvider("http://192.168.68.101:8545")
);

// Get the current block number
const getBlockNumber = async () => {
  return await web3.eth.getBlockNumber();
};

const currentChain = async () => {
  return await web3.eth.getChainId();
};

// from the chain id, get the chain name from an api call
const getChainName = async (chainId) => {
  return await web3.eth.net.getNetworkType();
};
// Get the number of peers connected to.
const getPeerCount = async () => {
  return await web3.eth.net.getPeerCount();
};
// get the current gas price
const getGasPrice = async () => {
  let gas = await web3.eth.getGasPrice();
  // convert to ether
  let gasPrice = web3.utils.fromWei(gas, "ether");
  return gasPrice;
};

// view the current block
const getBlock = async (blockNumber) => {
  return await web3.eth.getBlock(blockNumber);
};

(async () => {
  // create a table of all functions
  console.table({
    chain: await currentChain(),
    chainName: await getChainName(await currentChain()),
    blockNumber: await getBlockNumber(),
    peerCount: await getPeerCount(),
    gasPrice: await getGasPrice(),
  });
  let block = await getBlock(await getBlockNumber());

  delete block.logsBloom;
  delete block.transactions;
  //search the block miners account eth balance
  let balance = await web3.eth.getBalance(block.miner);
  // convert to ether
  let minerBalance = web3.utils.fromWei(balance, "ether");
  console.log(
    `The block miner's account balance is ${minerBalance} for block ${block.number}`
  );
  console.table(block);


  // console.log({block})
  return;
})();
