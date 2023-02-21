import { User } from "@prisma/client";
import Database from "../utils/Database";
import { AuthError } from "../utils/Errors";

export async function getUser(id: string) {
  const user = await Database.user.findFirst({
    where: { id },
  });
  if (!user) throw new AuthError(`Не удалось найти пользователя с id: ${id}`);
  return user;
}
