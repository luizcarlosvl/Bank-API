const sinon = require('sinon');
const { expect } = require('chai');

const ClientModel = require('../src/models/clients.model');
const ClientService = require('../src/services/clients.service');

describe('Insere um novo cliente no BD', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadClient = {};

    it('retorna uma mensagem de erro', async () => {
      try { 
        await ClientService.clientCreateService(payloadClient);   
      }
      catch(err) {
        expect(err.message).to.be.equal('Invalid entries. Try again.');
      }
    });

    it('retorna um status de erro', async () => {
      try { 
        await ClientService.clientCreateService(payloadClient);   
      }
      catch(err) {
        expect(err.status).to.be.equal(400);
      }
    });

  });

  describe('quando é inserido com sucesso', () => {
    const payloadClient = {
      name: 'Santos Dumont',
      cpf: '12312312312',
    };

    before(() => {
      const response = {
        name: 'Santos Dumont',
        cpf: '12312312312',
        balance: 0
      }

      sinon.stub(ClientModel, 'clientCreateModel')
        .resolves(response);
    });

    after(() => {
      ClientModel.clientCreateModel.restore();
    });

    it('retorna um objeto', async () => {
      
      const response = await ClientService.clientCreateService(payloadClient);
      
      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades do cliente inserido', async () => {
      const response = await ClientService.clientCreateService(payloadClient);

      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('cpf');
      expect(response).to.have.a.property('balance');
    });

  });
});