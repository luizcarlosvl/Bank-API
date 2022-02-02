const Joi = require('joi');

const { depositModel } = require('../models/deposits.model');
const { badRequest } = require('../utils/statusCode');

const errorConstructor = require('../functions/errorHandling');

const depositSchema = Joi.object({
  cpf: Joi.string().length(11).regex(/^\d+$/).required().error(new Error('Invalid entries. Try again.')),
  value: Joi.number().min(0.01).max(2000).required().error(new Error('Invalid entries. Try again.')),
});

const depositService = async (deposit) => {
  const { error } = depositSchema.validate(deposit);

  if (error) throw errorConstructor(badRequest, error.message);

  const newDeposit = await depositModel(deposit);
  
  return newDeposit;
};

module.exports = {
  depositService,
};