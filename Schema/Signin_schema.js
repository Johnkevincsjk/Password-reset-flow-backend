const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://johnkevincsjk:6uY3pFdNzFOH86vZ@testusers.ooyvlfq.mongodb.net/backend_passwordreset')

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