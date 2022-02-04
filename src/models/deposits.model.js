const connect = require('./connection');

const errorConstructor = require('../functions/errorHandling');
const { notFound } = require('../utils/statusCode');

const depositModel = async (deposit) => {
  
  const conn = await connect();
  
  const { cpf, value } = deposit;
  
  const findClient = await conn.collection('clients').findOne({ cpf });
  
  if (!findClient) throw errorConstructor(notFound, 'Client not found');
  
  const { balance } = findClient;
  
  const newBalance = parseFloat(balance) + parseFloat(value);

  await conn.collection('clients')
  .updateOne({ cpf }, { $set: { balance: newBalance } });

  return { cpf, newBalance }
};

module.exports = {
  depositModel,
};