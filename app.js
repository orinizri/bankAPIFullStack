const express = require('express')
require("dotenv").config()
const app = express();
const mongoose = require('mongoose')
const { CorsConfig } = require("./config");
const { MONGOOSE_SERVER } = require('./config');
const cors = require('cors')
const path = require('path');
const res = require('express/lib/response');
const clientRouter = require('./routes/client')
const publicPath = path.join(__dirname, 'frontend/build')
const localPath = path.join(__dirname, 'frontend/public')
// Connect to the MongoDB cluster

try {
    mongoose.connect(
        MONGOOSE_SERVER,
        () => console.log(`Mongoose is connected ${MONGOOSE_SERVER}`)
    );
} catch (e) {
    res.send({ error: e.message })
}

app.use(cors(CorsConfig));
app.use(express.json());
app.use(express.static(localPath))

app.use('/', clientRouter)

app.get('*', function (request, response) {
    console.log(__dirname)
    response.sendFile(path.join(__dirname, '/frontend/index.html'));
});


app.listen(process.env.PORT || 8080, () => {
    console.log(`server is on port ${process.env.PORT || 8080}`)
})