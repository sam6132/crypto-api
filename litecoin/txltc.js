const explorers = require("./crypto-api/litecoin/node_modules/litecore-explorers");
const insight = new explorers.Insight("https://testnet.litecore.io", "testnet");
const LiteCoin = require("litecore-lib");

let fromAddress = "mu2RNKBrFznRcsXc9WVswP4hJxJkTb9ygv";
let fromAddressPrivateKey =
  "a6d9e3c9aadadc3bf2e7226034d1ec0dd067c796ce1ffa18e22db6cf19235d1f";
let toAddress = "mmpoLxXZhyYhpFCpVZGqBEWrRghxLgzG9d";
let balance = 0;
let fee = 100000; //transaction fee should be more than 10000 satoshi

let privateKey = LiteCoin.PrivateKey.fromWIF(fromAddressPrivateKey);

//get the unspent transactions of this address
function getutxos(address) {
  return new Promise((resolve, reject) => {
    insight.getUtxos(address, function(error, response) {
      if (error) reject(error);
      resolve(response);
    });
  });
}

getutxos(fromAddress).then(utxos => {
  // console.log(utxos)

  //calculating total balance by the object satoshi's value in all utxos
  for (let i = 0; i < utxos.length; i++) {
    balance += utxos[i]["satoshis"];
  }
  let sendbal = balance / 2; // 1/4th value of total balance
  console.log("balance =>>> ", balance, sendbal);
  // creating transaction using litecore-lib library and signing it by passing
  // from,to,txFee,utxos(unspentTransactions)
  let rawtx = new LiteCoin.Transaction()
    .from(utxos)
    .to(toAddress, sendbal) //note: you are sending all your balance AKA sweeping
    .fee(fee)
    .change(fromAddress)
    .sign(privateKey);

  //broadcast transaction using rawtx bytes
  insight.broadcast(rawtx.toString(), function(err, returnedTxId) {
    if (err) {
      console.log(err);
    } else {
      console.log("transactionID ----> ", returnedTxId);
    }
  });
});
