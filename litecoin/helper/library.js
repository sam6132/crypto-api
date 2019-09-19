const explorersLTC = require('litecore-explorers');
const insightLTC = new explorersLTC.Insight('https://testnet.litecore.io','testnet');
const LiteCoin = require('litecore-lib');
const explorersBTC = require('bitcore-explorers');
const bitcoin = require('bitcoinjs-lib');
const bitcore = require('bitcore-lib');
const insightBTC = new explorersBTC.Insight('testnet');


module.exports = {explorersLTC,explorersBTC,insightLTC,insightBTC,bitcoin,LiteCoin,bitcore};