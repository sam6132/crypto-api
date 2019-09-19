const {LiteCoin,insightLTC,explorers} = require('./helper/library');

exports.createltcaddress = function(req, res) {
  let privatekey = new LiteCoin.PrivateKey();
  let address = privatekey.toAddress();
  let addressAndPrivateKey = "address : " + address + " PrivateKey : " + privatekey
  res.send(addressAndPrivateKey);
  console.log(addressAndPrivateKey);
  console.log(address,privatekey)
}


exports.sendltc = function(req, res) {
  let fromAddress = req.body.fromAddress;
  let fromAddressPrivateKey = req.body.fromAddressPrivateKey;
  let toAddress = req.body.toAddress;
  let amount = req.body.amount;
  let balance = 0;
  const minerFee = unit.fromMilis(0.128).toSatoshis(); //cost of transaction in satoshis (minerfee)
  getutxos(fromAddress).then(utxos => {
    //calculating total balance by the object satoshi's value in all utxos
    for (let i = 0; i < utxos.length; i++) {
      balance += utxos[i]["satoshis"];
    }
    console.log(balance,amount1)
    // creating transaction using litecore-lib library and signing it by passing
    let rawtx = new LiteCoin.Transaction()
      .from(utxos)
      .to(toAddress,amount) //note: you are sending all your balance AKA sweeping
      .fee(fee)
      .change(fromAddress)
      .sign(fromAddressPrivateKey);

    // from,to,txFee,utxos(unspentTransactions)

    //broadcast transaction using rawtx bytes
    insightLTC.broadcast(rawtx.toString(), function(err, returnedTxId) {
      if (err) {
        console.log(err);
      } else {
        res.send(returnedTxId);
        console.log("transactionID ----> ", returnedTxId);
      }
    });
  });

  function getutxos(address) {
    return new Promise((resolve, reject) => {
      insightLTC.getUtxos(address, function(error, response) {
        if (error) reject(error);
        resolve(response);
      });
    });
  }
};
