const nodemailer_controller = require('express').Router()
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()



async function ResetMail(Mailid, ramdamstring) {

    console.log(Mailid, ramdamstring)
    try {
        const mailSender = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "johnkevin.csjk@gmail.com",
                pass: 'tonckprcbyxwosnq'
            }

        })

        const composeMail = {
            from: process.env.MAIL_EMAIL,
            to: Mailid,
            subject: "Password reset",
            text: ramdamstring

        }

        let info = await mailSender.sendMail(composeMail);
        console.log('Mail sent successfully:', info.response);
        console.log(info)
        return info;

    } catch (error) {
        console.error('Error sending mail:', error);
        throw error;
    }


   
}




module.exports = ResetMail