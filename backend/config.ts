export default {
  server: {
    host: "10.0.0.213",
    port: 4000,
  },
  jwt: {
    secret: "mySecretKeyForJwt",
  },
  files: {
    uploadFolder: "./uploads",
  },
  mailer: {
    hostSMTP: "smtp.rambler.ru",
    port: 465,
    login: "typerunner@rambler.ru",
    password: "Typerunner123",
  },
  logger: {
    folder: "./log",
    console: true,
    file: true,
    tempFile: true,
    color: true,
    datePattern: "DD.MM.YYYY",
    logDatabaseRequests: false,
  },
};
