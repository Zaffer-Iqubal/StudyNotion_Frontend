const nodemailer = require("nodemailer");
require('dotenv').config()

exports.mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        let info = await transporter.sendMail({
            from: `StudyNotion 🔖 || Code-Hub -> By Zaffer Iqubal 😊`,
            to: `${email}`,
            subject: `${title}`,
            html: `<b>${body}</b>`
            });
            console.log("Message sent successfully!", info);
            return info;

    } catch (error) {
        console.log(error.message);
    }
} 
