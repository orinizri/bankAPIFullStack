const express = require('express')
const clientRouter = express.Router();
const { getAllClients, addClient , findClient} = require('../controllers/client')

clientRouter.get('/allClients', getAllClients);
clientRouter.get('/clients/:id', findClient);
clientRouter.post('/addClient',addClient); // Qurey: name, cash, deposit



module.exports = clientRouter;