const {
    PORT,
    NODE_ENV,
    SENDGRID_API_KEY,
    SERVICE_MAIL,
    MAILTRAP_USER,
    MAILTRAP_PASS,
} = process.env;

module.exports = {
    port: PORT,
    nodeEnv: NODE_ENV,
    sendGridApiKey: SENDGRID_API_KEY,
    serviceMail: SERVICE_MAIL,
    mailTrapPass: MAILTRAP_PASS,
    mailTrapUser: MAILTRAP_USER,
};
