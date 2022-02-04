const { success } = require('../utils/statusCode');
const { balanceService } = require('../services/balances.service');

const balanceController = async (req, res, next) => {
  try {
    const client = req.body;

    const balance = await balanceService(client);

    return res.status(success).json({ balance });

  } catch (error) {

    return next(error);
  }
};

module.exports = {
  balanceController,  
};