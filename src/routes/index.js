const express = require('express');
const router = express.Router();

const {
  userCreateController,
} = require('../controllers/users.controllers');

router.post('/clients', userCreateController);

module.exports = router;