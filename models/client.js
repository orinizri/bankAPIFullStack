const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: String,
    deposit : {
        type: Number,
        default: 0
    },
    cash : {
        type: Number,
        default: 0,
        validate: {
            validator: function (value) {
                return value > 0
            },
        }
    }
});

const ClientModel = mongoose.model('Client', clientSchema);

module.exports = ClientModel;