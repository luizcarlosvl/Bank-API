const Joi = require('joi');

const { balanceModel } = require('../models/balances.model');
const { badRequest } = require('../utils/statusCode');

const errorConstructor = require('../functions/errorHandling');

const balanceSchema = Joi.object({
  cpf: Joi.string().length(11).regex(/^\d+$/).required().error(new Error('Invalid entries. Try again.')),
});

const balanceService = async (client) => {
  const { error } = balanceSchema.validate(client);

  if (error) throw errorConstructor(badRequest, error.message);

  const balance = await balanceModel(client);
  
  return balance;
};

module.exports = {
  balanceService,
};