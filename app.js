const express = require('express');
const app = express();

const ltcrouter = require('./litecoin/LiteCoinRouter');
const btcrouter = require('./bitcoin/BitCoinRouter.js');

app.use(express.json());
app.use('/ltc',ltcrouter);
app.use('/btc',btcrouter);

app.listen(3000,()=> console.log('listening om 3000'));