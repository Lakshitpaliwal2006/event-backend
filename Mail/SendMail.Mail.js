import nodemailer from "nodemailer"
import MailTransporter from "./MailTransporter.Mail.js";
const SendMail = async ({ email }, OTP) => {
    try {
        const response = await MailTransporter.sendMail({
            from: '"Expensio Team" <paliwallucky001@gmail.com>',
            to: email,
            subject: 'Verify your email address',
            text: `Your verification code is ${OTP}. It is valid for 10 minutes. Do not share this code with anyone.`,
        });
        console.log("Message Has been Send Successfully.")
        return response.data;
    } catch (error) {
        console.log("Something error in Sending Mail.", error);
    }
}
export default SendMail;