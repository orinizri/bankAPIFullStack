require("dotenv").config()

const CorsConfig = {
    origin:["http://localhost:3000", "https://localhost:3000"]
}
const {  MONGOOSE_SERVER } = process.env 

module.exports ={ MONGOOSE_SERVER, CorsConfig }