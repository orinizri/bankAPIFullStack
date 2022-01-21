const res = require('express/lib/response');
const ClientModel = require('../models/client')

const addClient = async (req, res) => {
    try {
    const newClient = new ClientModel({ name : "ori"})
        res.send(newClient)
    } catch (e) {
        res.send({error : e.message})
    }
}
const getAllClients = async (req,res) => {
    try {
        const users = await ClientModel.find()
        res.send(users)
    } catch (e) {
        res.send({error : e.message})
    }
}

const findClient = async (req, res) => {
    const { id } = req.params
    try {
        const selectedClient = await ClientModel.find({_id:id})
        if (selectedClient) {
            res.status(200).send(selectedClient)
        }
    } catch (e) {
        res.send({error : e.message})
    }
}

module.exports = { getAllClients , addClient, findClient }