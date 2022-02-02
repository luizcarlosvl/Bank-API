const Joi = require('joi');

const { clientCreateModel } = require('../models/clients.model');
const { badRequest } = require('../utils/statusCode');

const errorConstructor = require('../functions/errorHandling');

const depositSchema = Joi.object({
  name: Joi.string().min(1).required().error(new Error('Invalid entries. Try again.')),
  cpf: Joi.string().length(11).regex(/^\d+$/).required().error(new Error('Invalid entries. Try again.')),
});

const clientCreateService = async (client) => {
  const { error } = depositSchema.validate(client);

  if (error) throw errorConstructor(badRequest, error.message);

  const newclient = await clientCreateModel(client);
  
  return newclient;
};

module.exports = {
  clientCreateService,
};