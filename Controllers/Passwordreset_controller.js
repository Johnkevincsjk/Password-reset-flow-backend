const Passreset_controller = require('express').Router();
const user_schema = require('../Schema/Signin_schema');
const crypto = require('crypto')
const nodemailer_controller = require('express').Router()
const dotenv = require('dotenv')
const sendMailer = require('./nodemailer_controller')
dotenv.config()




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
            const token_timeout = user.ResetTokenExpire = Date.now() + 100000
            const ramdamstring = `http://localhost:3000/NewPassword/${randomToken}`
            const mails = sendMailer(Mailid, ramdamstring)
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

Passreset_controller.post('/createPassword', async (req, res) => {
    try {
        const { token } = req.query;
        const { Password } = req.body;

        const user = await user_schema.findOne({
            PasswordResetToken: token,
            ResetTokenExpire: { $gt: Date.now() } // Ensure token is not expired
        });

        if (user) {
            user.Password = Password;
            user.PasswordResetToken = ""; // Clear the reset token
            user.ResetTokenExpire = ""; // Clear the token expiry time
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
            status: 'error',
            message: 'Something went wrong'
        });
    }
});





module.exports = Passreset_controller, nodemailer_controller;
