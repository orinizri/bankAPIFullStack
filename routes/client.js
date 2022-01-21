const express = require('express')
const clientRouter = express.Router();
const { getAllClients, addClient } = require('../controllers/client')

clientRouter.get('/clients',addClient);
clientRouter.get('/allClients', getAllClients);




module.exports = clientRouter;