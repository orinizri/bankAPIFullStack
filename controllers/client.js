const ClientModel = require('../models/client')

const addClient = async (req, res) => {
    try {
        const { name, cash, deposit } = req.query
        const newClient = new ClientModel({
            name,
            cash,
            deposit
        })
        newClient.save()
        res.status(200).send(newClient)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

const getAllClients = async (req, res) => {
    try {
        const users = await ClientModel.find()
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

const findClient = async (req, res) => {
    try {
        const { id } = req.params
        const selectedClient = await ClientModel.find({ _id: id })
        if (selectedClient) {
            res.status(200).send(selectedClient)
        }
    } catch (e) {
        res.status(400).send({ error : e.message })
    }
}
const depositToClient = async (req, res) => {
    try {
        const { id, amount } = req.params
        const updatedClient = await ClientModel.findOneAndUpdate({ _id : id }, { $inc: { 'deposit': amount } },{new: true})
        res.status(200).send(updatedClient)
    } catch (e) {
        res.status(400).send({ error : e.message })
    }
}

const withdrawalToClient = async (req, res) => {
    try {
        const { id, amount } = req.params
        const [selectedClient] = await ClientModel.find({ _id : id })
        if (selectedClient.deposit - amount >= 0) {
            const updatedClient = await ClientModel.findOneAndUpdate({ _id: id }, { $inc: { 'deposit': -amount } },{new: true})
            res.status(200).send(updatedClient)
        } else {
            throw Error("Not enough deposits")
        }
    } catch (e) {
        res.status(400).send({ error : e.message })
    }
}

module.exports = { getAllClients, addClient, findClient, depositToClient, withdrawalToClient }