const res = require('express/lib/response');
const ClientModel = require('../models/client')

const addClient = async (req, res) => {
    console.log("add client")
    try {
        res.send("ok")
    } catch (e) {
        res.send({error : e.message})
    }
}
const getAllClients = async () => {
    try {
        const users = await ClientModel.find()
        res.send(users)
    } catch (e) {
        res.send({error : e.message})
    }
}
module.exports = { getAllClients , addClient }