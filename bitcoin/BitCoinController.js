const {
  bitcoin,
  bitcore,
  insightBTC
} = require("../litecoin/helper/library.js");

exports.createbtcaddress = function(req, res) {
  const testnet = bitcoin.networks.testnet;
  let keyPair = bitcoin.ECPair.makeRandom({ network: testnet });

  const { address } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: testnet
  });
  let pkey = keyPair.toWIF();
  let addressPK = "Address : " + address + "PrivateKey : " + pkey;
  res.send(addressPK);
  console.log(address, pkey);
};
exports.sendbtc = function(req, res) {
  async function sendTransaction() {
    try {
      const fromAddress = req.body.fromAddress;
      const fromAddressPrivateKey = new bitcore.PrivateKey(
        req.body.fromAddressPrivateKey
      );
      const toAddress = req.body.toAddress;
      const unit = bitcore.Unit;
      const minerFee = unit.fromMilis(0.128).toSatoshis(); //cost of transaction in satoshis (minerfee)
      const transactionAmount = unit.fromMilis(req.body.amount).toSatoshis();
      let utxos = await getUTXOS(fromAddress);
      let bitcore_transaction = new bitcore.Transaction()
        .from(utxos)
        .to(toAddress, transactionAmount)
        .fee(minerFee)
        .change(fromAddress)
        .sign(fromAddressPrivateKey);
      // broadcast the transaction to the blockchain
      insightBTC.broadcast(bitcore_transaction.toString(), function(
        error,
        body
      ) {
        if (error) {
          console.log("Error in broadcast: " + error);
        } else {
          console.log({
            transactionId: body
          });
        }
      });
    } catch (error) {
      return console.log(error.message);
    }
  }
  sendTransaction();
  async function getUTXOS(address) {
    return new Promise((resolve, reject) => {
      insightBTC.getUnspentUtxos(address, function(error, utxos) {
        if (error) {
          reject(error);
        }
        let balance = 0;
        for (let i = 0; i < utxos.length; i++) {
          balance += utxos[i].satoshis;
        }
        console.log(balance);
        resolve(utxos);
      });
    });
  }
};
