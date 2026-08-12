import nodemailer from "nodemailer"
import dotenv, { configDotenv } from "dotenv"

dotenv.configDotenv()
const MailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

MailTransporter.verify((error, success) => {
    if (error) {
        console.log(`Some Error in Sender Mail ${error}`)
    }
    else {
        console.log(`Sender Mail is Successfully Transported : ${success}`)
    }
})

export default MailTransporter
