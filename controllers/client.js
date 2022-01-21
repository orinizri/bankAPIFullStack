const res = require('express/lib/response');
const ClientModel = require('../models/client')

const isUserExist = async (id) => await ClientModel.findOne({ id : id })


const addClient = async (req, res) => {
    try {
    // const isClient = await isUserExist(id)
    const newClient = new ClientModel({ name : "ori"})
    // console.log(newClient, isClient)
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
module.exports = { getAllClients , addClient }