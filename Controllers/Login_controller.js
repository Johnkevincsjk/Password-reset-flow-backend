const Login_controller = require('express').Router()
const User_login_DB = require('../Schema/Signin_schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



Login_controller.all('/getall', (req, res, next) => {
    res.status(200).send({
        Feedback: "Server runner"

    })
})

Login_controller.post('/loginUser', (req, res, next) => {
    const { Mailid, Password } = req.body
    User_login_DB.findOne({ Mailid: Mailid }).then((response) => {
        if (response && response._id) {
            if (bcrypt.compareSync(response.Password, Password)) {
                const token = jwt.sign({ Role: ['user'] }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 10 })



                return res.status(200).json({
                    Feedback: 'Login Successfully',
                    token
                })
            } else {
                return res.status(400).json({
                    Error: true,
                    Feedback: 'Mail id or password is invaild'
                })
            }
        } else {
            return res.status(400).json({
                Error: true,
                Feedback: 'Account does not exist'
            })
        }
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            Error: true,
            Feedback: 'Something went wrong',
            err
        })
    })

})


module.exports = Login_controller