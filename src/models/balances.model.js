const connect = require('./connection');

const errorConstructor = require('../functions/errorHandling');
const { notFound } = require('../utils/statusCode');

const balanceModel = async (client) => {
  
  const conn = await connect();
  
  const { cpf } = client;
  
  const findClient = await conn.collection('clients').findOne({ cpf });
  
  if (!findClient) throw errorConstructor(notFound, 'Client not found');
  
  const { balance } = findClient;
  
  return balance;
};

module.exports = {
  balanceModel,
};