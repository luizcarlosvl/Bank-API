const sinon = require('sinon');
const { expect } = require('chai');

const ClientService = require('../src/services/clients.service');
const ClientController = require('../src/controllers/clients.controller');

describe('Ao chamar o controller de create', () => {
  
  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
      name: 'Santos Dumond',
      cpf: '12312312312',
    };

    response.status = sinon.stub()
    .returns(response);
    response.json = sinon.stub()
    .returns();

    sinon.stub(ClientService, 'clientCreateService')
    .resolves(true);
    })

    after(() => {
      ClientService.clientCreateService.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await ClientController.clientCreateController(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

  });
});