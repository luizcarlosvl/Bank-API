const connect = require('./connection');

const errorConstructor = require('../functions/errorHandling');
const { notFound } = require('../utils/statusCode');

const transferModel = async (transfer) => {
  
  const conn = await connect();
  
  const { cpfSender, value, cpfReceiver } = transfer;
  
  const findSender = await conn.collection('clients').findOne({ cpf: cpfSender });

  const findReceiver = await conn.collection('clients').findOne({ cpf: cpfReceiver });
  
  if (!findSender || !findReceiver) throw errorConstructor(notFound, 'Client not found');
  
  const { balance: senderBalance } = findSender;

  const { balance: receiverBalance } = findReceiver;
  
  const newSenderBalance = parseFloat(senderBalance) - parseFloat(value);
  
  const newReceiverBalance = parseFloat(receiverBalance) + parseFloat(value);

  if (newSenderBalance < 0) throw errorConstructor(notFound, 'insufficient funds');

  await conn.collection('clients')
  .updateOne({ cpf: cpfSender }, { $set: { balance: newSenderBalance } });

  await conn.collection('clients')
  .updateOne({ cpf: cpfReceiver }, { $set: { balance: newReceiverBalance } });

  return { cpfSender, newSenderBalance }
};

module.exports = {
  transferModel,
};