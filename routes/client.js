const express = require('express')
const clientRouter = express.Router();
const { getAllClients, addClient } = require('../controllers/client')

clientRouter.get('/',addClient);
// clientRouter.get('/', getAllClients);




module.exports = clientRouter;