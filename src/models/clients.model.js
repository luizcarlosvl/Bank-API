const connect = require('./connection');

const errorConstructor = require('../functions/errorHandling');
const { conflict } = require('../utils/statusCode');

const clientCreateModel = async (client) => {
  const conn = await connect();
  
  const { cpf, name } = client;
  
  const findClient = await conn.collection('clients').findOne({ cpf });
  
  if (findClient) throw errorConstructor(conflict, 'Client already registered');
  
  const newClient = {
    name,
    cpf,
    balance: 0,
  };

  await conn.collection('clients').insertOne(newClient);
  
  return newClient;
};

module.exports = {
  clientCreateModel,
};