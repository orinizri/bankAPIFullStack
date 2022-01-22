const express = require('express')
const clientRouter = express.Router();
const { getAllClients, addClient , findClient, depositToClient, withdrawalToClient} = require('../controllers/client')

clientRouter.get('/allClients', getAllClients);
clientRouter.post('/addClient',addClient); // Query: name, cash, deposit
clientRouter.get('/clients/:id', findClient);
clientRouter.put('/clients/deposit/:id/:amount', depositToClient);
clientRouter.put('/clients/withdrawal/:id/:amount', withdrawalToClient);




module.exports = clientRouter;