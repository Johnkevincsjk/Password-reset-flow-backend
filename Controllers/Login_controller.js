const Login_controller = require('express').Router()
const User_login_DB = require('../Schema/Signin_schema')
const bcrypt = require('bcrypt')



Login_controller.all('/getall', (req, res, next) => {
    res.status(200).send({
        Feedback: "Server runner"

    })
})

Login_controller.post('/loginUser', (req, res, next) => {
    const { Mailid, Password } = req.body
    User_login_DB.findOne({ Mailid: Mailid }).then((response) => {
        if (response && response.id) {
            if (bcrypt.compare(response.Password, Password)) {
                res.status(200).json({
                    Feedback: 'Login Successfully'
                })
            } else {
                res.status(400).json({
                    Error: true,
                    Feedback: 'Mail id or password is invaild'
                })
            }
        } else {
            res.status(400).json({
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