const express = require('express');
const router = express.Router();

let bitCoinController = require('./BitCoinController.js');

router.get('/createbtcaddress',bitCoinController.createbtcaddress);
router.post('/sendbtc',bitCoinController.sendbtc);

module.exports = router;