const bitcore = require('bitcore-lib');
const explorers = require('bitcore-explorers');
const insight = new explorers.Insight('testnet');
const express = require('express');
const app = new express();



async function getUTXOS() {
    return new Promise((resolve, reject) => {
        insight.getUnspentUtxos('n2WuSTCPjbz5cGJSMFWJpqdFyCmzX1JDBN', function(
            error,
            utxos
        ) {
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

async function sendTransaction() {
    try {
        const fromAddress = 'mgxhSX2rgEYLfT5owkFtCrTReFaXdW1ND2';
        const privateKey = new bitcore.PrivateKey(
            'cU6vctogrg9JnXkT5PwXNSbyXV4ZbffUJWeRbe9C2MoaxM25d4nd'
        );

        const toAddress = 'n2WuSTCPjbz5cGJSMFWJpqdFyCmzX1JDBN';

        const unit = bitcore.Unit;
        const minerFee = unit.fromMilis(0.128).toSatoshis(); //cost of transaction in satoshis (minerfee)
        const transactionAmount = unit.fromMilis(2).toSatoshis();

        let utxos = await getUTXOS();

        let bitcore_transaction = new bitcore.Transaction()
            .from(utxos)
            .to(toAddress, transactionAmount)
            .fee(minerFee)
            .change(fromAddress)
            .sign(privateKey);

        //handle serialization errors

        // console.log(bitcore_transaction);

        // broadcast the transaction to the blockchain
        insight.broadcast(bitcore_transaction.toString(), function(
            error,
            body
        ) {
            if (error) {
                console.log('Error in broadcast: ' + error);
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
