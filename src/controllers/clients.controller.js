const { created } = require('../utils/statusCode');
const { clientCreateService } = require('../services/clients.service');

const clientCreateController = async (req, res, next) => {
  try {
    const client = req.body;

    const newClient = await clientCreateService(client);

    return res.status(created).json({ newClient });

  } catch (error) {

    return next(error);
  }
};

module.exports = {
  clientCreateController,  
};