require("dotenv").config({ path: "/.env" });
const env = process.env as { [key: string]: any };

export default {
  server: {
    host: env.SERVER_HOST || "localhost",
    port: env.SERVER_PORT || 4000,
  },
  jwt: {
    secret: env.JWT_SECRET || "default",
  },
  files: {
    uploadFolder: "./uploads",
  },
  mailer: {
    host: env.MAILER_SMTP_ADDRESS,
    port: env.MAILER_SMTP_PORT,
    login: env.MAILER_LOGIN,
    password: env.MAILER_PASSWORD,
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
