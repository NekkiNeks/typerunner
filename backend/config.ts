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
