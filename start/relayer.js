//const EthereumTx = require('ethereumjs-tx');
const privateKey = Buffer.from(
  'b919f9d775811912c73831947bab55dccb0d124ca9ae04a42633a27b9ff05925',
  'hex',
);

const { Conflux } = require('js-conflux-sdk');
const cfx = new Conflux.Conflux({
  //url: 'http://main.confluxrpc.org'
  url: 'mainnet-rpc.conflux-chain.org.cn/ws/v2',
  networkId: 1029
});

async function relay() {
    let r = await cfx.getStatus();
    console.log(r);
}


