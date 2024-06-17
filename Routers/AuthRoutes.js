const AuthRoutes = require('express').Router()




AuthRoutes.use('/resetflow', require('../Controllers/Login_controller'))
AuthRoutes.use('/resetflow', require('../Controllers/Signin_controller'))
// AuthRoutes.use('/resetflow', require('../Controllers/nodemailer_controller'))
AuthRoutes.use('/resetflow', require('../Controllers/Passwordreset_controller'))

module.exports = AuthRoutes