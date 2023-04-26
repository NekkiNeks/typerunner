import config from "../config";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { validateCredentials } from "../functions/validation";
import Database from "../utils/Database";
import { AuthError } from "../utils/Errors";

export async function registerUser(
  login: string,
  password: string,
  email: string
) {
  validateCredentials(login, password, email);
  const user = await Database.user.create({ data: { login, password, email } });
  await sendVerifyLinkToEmail(email, user.id);
  return user;
}

export async function loginUser(login: string, password: string) {
  const user = await Database.user.findFirst({ where: { login } });
  if (!user) throw new AuthError("Пользователя с таким логином не сущесвует");
  if (user.password !== password) throw new AuthError("не верный пароль");
  return user;
}

async function sendVerifyLinkToEmail(email: string, id: string) {
  const link = `http://${config.server.host}:${config.server.port}/auth/verify?userId=${id}`;

  const text = `Добро пожаловать в typerunner 🎉\n Чтобы подтвердить свой аккаунт перейдите по ссылке: \n${link}`;

  const transpotrer = nodemailer.createTransport({
    host: config.mailer.host,
    port: config.mailer.port,
    secure: true,
    auth: {
      user: config.mailer.login,
      pass: config.mailer.password,
    },
  });

  await transpotrer.verify().catch((_) => {
    console.log(_);
    throw new AuthError("Ошибка подключения к почтовому сервису.");
  });

  const options: Mail.Options = {
    from: `Typerunner <${config.mailer.login}>`,
    to: email,
    subject: "Подтверждение аккаунта",
    text: text,
  };

  const result = await transpotrer.sendMail(options);
  return result;
}

export async function verifyUserByEmailLink(id: string) {
  return await Database.user.update({
    where: { id },
    data: { verified: true },
  });
}
