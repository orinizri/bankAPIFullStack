const mongoose = require('mongoose');
const validator = require('validator');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: "",
        validate (value) {
            return validator.isAlpha(value)
        }
    },
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