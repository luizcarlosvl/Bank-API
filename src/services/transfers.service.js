const Joi = require('joi');

const { transferModel } = require('../models/transfers.model');
const { badRequest } = require('../utils/statusCode');

const errorConstructor = require('../functions/errorHandling');

const transferSchema = Joi.object({
  cpfSender: Joi.string().length(11).regex(/^\d+$/).required().error(new Error('Invalid entries. Try again.')),
  cpfReceiver: Joi.string().length(11).regex(/^\d+$/).required().error(new Error('Invalid entries. Try again.')),
  value: Joi.number().min(0.01).max(2000).required().error(new Error('Invalid entries. Try again.')),
});

const transferService = async (transfer) => {
  const { error } = transferSchema.validate(transfer);

  if (error) throw errorConstructor(badRequest, error.message);

  const newTransfer = await transferModel(transfer);
  
  return newTransfer;
};

module.exports = {
  transferService,
};