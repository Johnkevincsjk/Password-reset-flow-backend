const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/Password_reset")

const Signin_schema = new mongoose.Schema({

    Full_name: {
        type: String,
        required: true
    },
    Mailid: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    PasswordResetToken: {
        type: String
    },
    ResetTokenExpire: {
        type: Date
    }
})


const Signin_model = mongoose.model('Signin_Client', Signin_schema)


module.exports = Signin_model 