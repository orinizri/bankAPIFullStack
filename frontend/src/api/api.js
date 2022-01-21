const axios = require('axios')

let myUrl = 'http://localhost:8080/';
if (process.env.NODE_ENV === 'production') {
    myUrl = '/'
}


const axiosRequest =  axios.create({
    baseURL: myUrl
})
module.exports = axiosRequest;