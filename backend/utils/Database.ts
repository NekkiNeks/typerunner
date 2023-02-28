import { PrismaClient } from "@prisma/client";
export default new PrismaClient();

export function exclude(object: any, keys: string[]) {
  for (let key of keys) {
    delete object[key];
  }
  return object;
}
