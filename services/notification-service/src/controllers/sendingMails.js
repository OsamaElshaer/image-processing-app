const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { logger } = require("../utils/logger");

const {
    nodeEnv,
    serviceMail,
    mailTrapPass,
    mailTrapUser,
    sendGridApiKey,
} = require("../config/env");

const sendEmail = async (emailTo, subject, html) => {
    try {
        let transporter;
        const mailOptions = {
            from: serviceMail,
            to: emailTo,
            subject: subject,
            html: html,
        };

        if (nodeEnv === "test") {
            transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: mailTrapUser,
                    pass: mailTrapPass,
                },
            });
        } else {
            transporter = nodemailer.createTransport(
                sendgridTransport({
                    auth: {
                        api_key: sendGridApiKey,
                    },
                })
            );
        }

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        logger.warn("Error sending email:", { error: error.message });
        return true;
    }
};

module.exports = { sendEmail };
