import Database from "../utils/Database";
import { Result } from "@prisma/client";

export type newResult = Omit<Result, "id">;

export async function getResultsByUserId(user_id: string) {
  const data = await Database.result.findMany({ where: { user_id } });
  return data;
}

export async function addResult(result: newResult) {
  const data = await Database.result.create({ data: result });
  return data;
}

export async function getBestResults() {
  const data = await Database.result.findMany({
    take: 100,
    orderBy: [{ value: "desc" }],
    include: { user: { select: { login: true } } },
  });
  return data;
}
