const { success } = require('../utils/statusCode');
const { transferService } = require('../services/transfers.service');

const transferController = async (req, res, next) => {
  try {
    const transfer = req.body;

    const newTransfer = await transferService(transfer);

    return res.status(success).json({ newTransfer });

  } catch (error) {

    return next(error);
  }
};

module.exports = {
  transferController,  
};