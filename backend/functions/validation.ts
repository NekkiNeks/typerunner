import { ValidationError } from "../utils/Errors";

export function validateCredentials(
  login: string,
  password: string,
  email: string
) {
  return {
    login: validateLogin(login),
    password: validatePassword(password),
    email: validateEmail(email),
  };
}

function validateLogin(login: string) {
  if (login.length < 6) throw new ValidationError("Логин слишком короткий");
  return login;
}

function validatePassword(password: string) {
  if (password.length < 6) throw new ValidationError("Пароль слишком короткий");
  return password;
}

function validateEmail(email: string) {
  if (email.length < 6) throw new ValidationError("Email не валидный");
}
