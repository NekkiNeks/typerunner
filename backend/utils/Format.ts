import { Prisma } from "@prisma/client";
import { ServerError } from "./Errors";
import { ClientError } from "./Errors";
import Logger from "./Logger";

const logger = new Logger("Errors");

// Справочник кодов ошибок
// 0 - Ошибка на стороне сервера
// 1 - Ошибка со стороны клиента

export function getApiResponse(
  success: boolean,
  data: any,
  error: Error | null
) {
  if (error) logger.error(error.message);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return { success, data, error: { message: error.message, code: 0 } };
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return { success, data, error: { message: error.message, code: 0 } };
  }

  if (error instanceof ServerError) {
    return { success, data, error: { message: error.message, code: 0 } };
  }

  if (error instanceof ClientError) {
    return { success, data, error: { message: error.message, code: 1 } };
  }
  logger.warn(`Необработанная ошибка: ${error}`);
  return { success, data, error };
}
