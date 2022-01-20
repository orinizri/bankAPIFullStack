const axios = require('axios')

let myUrl = 'http://localhost:3000/api';
if (process.env.NODE_ENV === 'production') {
    myUrl = 'api'
}


const axiosRequest =  axios.create({
    baseURL: myUrl
})
module.exports = axiosRequest;