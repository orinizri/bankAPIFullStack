const express = require('express')
const app = express();
const mongoose = require('./db/mongoose')
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors());
app.use(express.json());

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