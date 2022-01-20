const express = require('express')
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT || 3000;
const cors = require('cors')
const path = require('path')

const publicPath = path.join(__dirname, 'client/build')

app.use(cors());
app.use(express.json());

app.use(express.static(publicPath))


app.get('/api/users' , (req,res) => {
    try {
        res.status(200).send("ok")
    } catch (e) {
        res.status(400).send({error : e.message})
    }
})


app.listen(port, ()=> {
    console.log(`server is running on port: ${port}`)
})