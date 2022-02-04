const { success } = require('../utils/statusCode');
const { depositService } = require('../services/deposits.service');

const depositController = async (req, res, next) => {
  try {
    const deposit = req.body;

    const newdeposit = await depositService(deposit);

    return res.status(success).json({ newdeposit });

  } catch (error) {

    return next(error);
  }
};

module.exports = {
  depositController,  
};