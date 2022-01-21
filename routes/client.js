const express = require('express')
const clientRouter = express.Router();
const { getAllClients, addClient , findClient} = require('../controllers/client')

clientRouter.get('/allClients', getAllClients);
clientRouter.post('/addClient',addClient);
clientRouter.get('/clients/:id', findClient);



module.exports = clientRouter;