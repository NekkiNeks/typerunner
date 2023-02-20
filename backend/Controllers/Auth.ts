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
  return user;
}

export async function loginUser(login: string, password: string) {
  const user = await Database.user.findFirst({ where: { login } });
  if (!user) throw new AuthError("Пользователя с таким логином не сущесвует");
  if (user.password !== password) throw new AuthError("не верный пароль");
  return user;
}
