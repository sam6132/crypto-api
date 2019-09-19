const express = require('express');
const router = express.Router();

let liteCoinController = require('./LiteCoinController.js');

router.get('/createltcaddress',liteCoinController.createltcaddress);
router.post('/sendltc',liteCoinController.sendltc);

module.exports = router;