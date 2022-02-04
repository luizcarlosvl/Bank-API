const { created } = require('../utils/statusCode');
const service = require('../services/clients.service');

const clientCreateController = async (req, res, next) => {
  try {
    const client = req.body;

    const newClient = await service.clientCreateService(client);

    return res.status(created).json({ newClient });

  } catch (error) {

    return next(error);
  }
};

module.exports = {
  clientCreateController,  
};