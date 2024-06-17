const Signin_controller = require('express').Router()
const create_user = require('../Schema/Signin_schema')
const bcrypt = require('bcrypt')





Signin_controller.post('/createUser', async (req, res, next) => {
    const user_byct = { ...req.body }
    const { Mailid } = user_byct

    if (Mailid) {
        try {
            const user_exist = await create_user.findOne({ Mailid })
            if (user_exist) {
                res.status(200).json({
                    Success: false,
                    Feedback: "Already Clan Member",
                    user_exist
                })
            } else {
                user_byct.Password = await bcrypt.hash(user_byct.Password, 10)
                const new_user = new create_user(user_byct)
                new_user.save()
                    .then((response) => {
                        res.status(200).json({
                            Success: true,
                            Feedback: "User Created",
                            response
                        })
                    }).catch((err) => {
                        res.status(400).json({
                            Success: false,
                            Feedback: "something went wrong",
                            error: err
                        })
                    })
            }
        } catch (error) {
            res.status(500).json({
                Success: false,
                Feedback: 'error checking user existence'
            })
        }
    }

})




module.exports = Signin_controller