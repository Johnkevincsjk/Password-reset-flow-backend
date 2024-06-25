const Passreset_controller = require('express').Router();
const user_schema = require('../Schema/Signin_schema');
const crypto = require('crypto')
const nodemailer_controller = require('express').Router()
const dotenv = require('dotenv')
const ResetMail = require('./nodemailer_controller')
dotenv.config()
const bcrypt = require("bcrypt")





// password reset logic below
function generateToken() {
    const user = new user_schema()
    const randamString = crypto.randomBytes(20).toString('hex')
    user.PasswordResetToken = randamString


    return randamString

}
Passreset_controller.post('/Password_reset', async (req, res, next) => {
    try {
        const { Mailid } = req.body;
        const user = await user_schema.findOne({ Mailid });

        if (user) {

            const randomToken = generateToken();
            user.PasswordResetToken = randomToken;
            const token_timeout = user.ResetTokenExpire = Date.now() + 3600000 // 1hr
            const ramdamstring = `http://localhost:3000/NewPassword/${randomToken}`
            const mails = await ResetMail(Mailid, ramdamstring)
            await user.save()


            return res.status(200).json({
                status: 'success',
                message: 'Reset email sent',
                mails
            });

        } else {
            return res.status(404).json({
                status: 'fail',
                message: 'User does not exist'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
});



// New password Creation

Passreset_controller.post('/NewPassword/:ramdamstring', async (req, res, next) => {
    try {


        const { Password } = req.body

        const user = await user_schema.findOne({ PasswordResetToken: req.params.ramdamstring });
        console.log(user)

        if (user) {
            const hashedpassword = await bcrypt.hash(Password, 12)
            user.Password = hashedpassword;

            user.PasswordResetToken = ""
            user.ResetTokenExpire = ""
            await user.save();


            return res.status(200).json({
                status: 'success',
                message: 'Password reset successfully'
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Token is invalid or has expired'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Reset error',
            message: 'Something went wrong'
        });
    }
});





module.exports = Passreset_controller, nodemailer_controller;
