const nodemailer = require("nodemailer");
const { logger } = require("../utils/logger");

const {
    nodeEnv,
    emailUser,
    emailPassword,
    mailTrapPass,
    mailTrapUser,
    emailPort,
    emailHost,
} = require("../config/env");
const sendEmail = async (emailTo, subject, html) => {
    try {
        let transporter;
        const mailOptions = {
            from: `image processing <${emailUser}>`,
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
            transporter = nodemailer.createTransport({
                host: emailHost,
                port: emailPort,
                secure: false,
                auth: {
                    user: emailUser,
                    pass: emailPassword,
                },
            });
        }

        await transporter.sendMail(mailOptions);
        logger.info(`sending email to ${emailTo}`)
        return true;
    } catch (error) {
        logger.warn("Error sending email:", { error: error.message });
        return true;
    }
};

module.exports = { sendEmail };
