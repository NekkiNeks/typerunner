import { User } from "@prisma/client";
import Database from "../utils/Database";

export async function getUser(id: string) {
  const user = await Database.user.findMany({
    where: { id },
  });
  return user;
}
