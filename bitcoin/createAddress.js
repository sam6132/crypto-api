const bitcoin = require('bitcoinjs-lib');

const testnet = bitcoin.networks.testnet;
let keyPair = bitcoin.ECPair.makeRandom({ network: testnet });

const { address } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: testnet
});

let pkey = keyPair.toWIF();

console.log(address, pkey);

// let key = 'cRkYCYfHLafM7veq8VvWze3osuCEYaZR5XtEzvvwXV2qAE6t3rJc';

// let recevieraddress = 'myBK4yHyvtv1yAPC8TSiDozE14Lkj3N6uv';

// // console.log(address, pkey);

// // let key = bitcoin.ECPair.fromWIF(pkey);

// let tx = new bitcoin.TransactionBuilder();
// tx.addInput(
//     '0ad8fba68c8cba52d3ecbdf1f104c64e209ca1cc6e0622eb3b154e4fec986ad9',
//     0
// );

// tx.addOutput('n2WuSTCPjbz5cGJSMFWJpqdFyCmzX1JDBN', 10);
// tx.sign(0, key);

// // // console.log(key);
// // // console.log(bitcoin.Block.length);

// const txHash = tx.build().toHex();
// console.log(txHash);

// const transaction = bitcoin.Transaction.fromHex(txHash);
// // // console.log(transaction);
// // console.log(transaction.toHex());
