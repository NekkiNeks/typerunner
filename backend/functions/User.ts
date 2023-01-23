import Database from "../utils/Database";

export async function getUserById(userId: string) {
  return Database.user.findFirst({
    where: { id: userId },
    include: { results: true },
  });
}

// Добавить пользователя
export async function createUser(
  login: string,
  password: string,
  email: string
) {
  validateCredentials(login, password, email);
  return Database.user.create({ data: { login, password, email } });
}

// Логин пользователя
export async function loginUser(login: string, password: string) {
  const user = await Database.user.findFirst({ where: { login } });
  if (!user) throw new Error("Пользователь с таким логином не найден");
  if (user.password !== password) throw new Error("Пароль не верный");
  return user;
}

export async function deleteUser(id: string) {
  return await Database.user.delete({ where: { id } });
}

function validateCredentials(login: string, password: string, email: string) {
  return {
    login: validateLogin(login),
    password: validatePassword(password),
    email: validateEmail(email),
  };
}

function validateLogin(login: string) {
  if (login.length < 6) throw new Error("Логин слишком короткий");
  return login;
}

function validatePassword(password: string) {
  if (password.length < 6) throw new Error("Пароль слишком короткий");
  return password;
}

function validateEmail(email: string) {
  if (email.length < 6) throw new Error("Email не валидный");
}
