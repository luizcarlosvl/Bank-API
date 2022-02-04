const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');
const mongoConnection = require('../src/models/connection');
const ClientModel = require('../src/models/clients.model');

describe('Insere novo cliente no BD', () => {
  let db;
  let connectionMock;

  const payloadClient = {
    name: 'Santos Dumont',
    cpf: '12312312312',
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    db = connectionMock.db('bank');
  });

  beforeEach(async () => {
    await db.collection('clients').deleteMany({});
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('quando inserido com sucesso', () => {
        
    it('retorna um objeto', async () => {
    const response = await ClientModel.clientCreateModel(payloadClient);

    expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades: name, cpf e balance', async () => {
    const response = await ClientModel.clientCreateModel(payloadClient);

    expect(response).to.have.a.property('name');
    expect(response).to.have.a.property('cpf');
    expect(response).to.have.a.property('balance');
    
    });
    
    it('deve existir um cliente com o cpf cadastrado!', async () => {
      await ClientModel.clientCreateModel(payloadClient);
      const ClientCreated = await connectionMock
      .db('bank')
      .collection('clients')
      .findOne({ cpf: payloadClient.cpf });
      expect(ClientCreated).to.be.not.null;
    });
  });
});