const {
    PORT,
    NODE_ENV,
    MAILTRAP_USER,
    MAILTRAP_PASS,
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_HOST,
    EMAIL_PORT,
} = process.env;

module.exports = {
    port: PORT,
    nodeEnv: NODE_ENV,
    mailTrapPass: MAILTRAP_PASS,
    mailTrapUser: MAILTRAP_USER,
    emailUser: EMAIL_USER,
    emailPassword: EMAIL_PASSWORD,
    emailHost: EMAIL_HOST,
    emailPort: EMAIL_PORT,
};
