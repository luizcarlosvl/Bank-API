const express = require('express');
const router = express.Router();

const {
  clientCreateController,
} = require('../controllers/clients.controller');

const {
  depositController,
} = require('../controllers/deposits.controller');

const {
  transferController,
} = require('../controllers/transfers.controller');

const {
  balanceController,
} = require('../controllers/balances.controller');

router.post('/clients', clientCreateController);

router.put('/deposits', depositController);

router.put('/transfers', transferController);

router.get('/balances', balanceController);

module.exports = router;
