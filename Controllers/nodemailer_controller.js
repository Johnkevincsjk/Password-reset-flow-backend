const nodemailer_controller = require('express').Router()
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()




// nodemailer_controller.post('/nodemailer', async (req, res, next) => {



// try {
//     await sendMail();
//     return (

//         res.status(200).json({
//             Feedback: 'mail sent successfully'

//         }))

// } catch (error) {
//     res.status(400).json({
//         Feedback: 'Failed to send mail',
//         error: error
//     })

// }
async function sendMail(Mailid, ramdamstring) {

    console.log(Mailid, ramdamstring)

    const mailSender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD
        }
    })

    const composeMail = {
        from: process.env.MAIL_EMAIL,
        to: Mailid,
        subject: "Password reset",
        text: ramdamstring

    }

    return mailSender.sendMail(composeMail, (error, info) => {
        console.log(error)
        if (error) {
            console.log(error)
        } else {
            console.log('Mail send successfully' + info.response)
        }
    })

}

// }



// )



module.exports = sendMail