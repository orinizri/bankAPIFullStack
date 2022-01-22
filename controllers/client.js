const res = require('express/lib/response');
const ClientModel = require('../models/client')

const addClient = async (req, res) => {
    const { name, cash, deposit } = req.query
    try {
        const newClient = new ClientModel({
            name,
            cash,
            deposit
        })
        newClient.save()
        res.send(newClient)
    } catch (e) {
        res.send({ error: e.message })
    }
}
const getAllClients = async (req, res) => {
    try {
        const users = await ClientModel.find()
        res.send(users)
    } catch (e) {
        res.send({ error: e.message })
    }
}

const findClient = async (req, res) => {
    const { id } = req.params
    try {
        const selectedClient = await ClientModel.find({ _id: id })
        if (selectedClient) {
            res.status(200).send(selectedClient)
        }
    } catch (e) {
        res.send({ error: e.message })
    }
}
const depositToClient = async (req, res) => {
    const { id, amount } = req.params
    try {
        const client = await ClientModel.findOneAndUpdate({ _id: id }, { $inc: { 'deposit': amount } },{new: true})
        res.status(200).send(client)
    } catch (e) {
        res.send({ error: e.message })
    }
}
const withdrawalToClient = async (req, res) => {
    const { id, amount } = req.params
    try {
        const [selectedClient] = await ClientModel.find({ _id: id })
        if (selectedClient.deposit - amount >= 0) {
            const updatedClient = await ClientModel.findOneAndUpdate({ _id: id }, { $inc: { 'deposit': -amount } },{new: true})
            res.status(200).send(updatedClient)
        } else {
            throw Error("Not enough deposits")
        }
    } catch (e) {
        res.send({ error: e.message })
    }
}

module.exports = { getAllClients, addClient, findClient, depositToClient, withdrawalToClient }