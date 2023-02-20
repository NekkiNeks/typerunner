import Database from "../utils/Database";
import { Result } from "@prisma/client";

export async function getResults(userId: string): Promise<Result[]> {
  const results = await Database.result.findMany({
    where: { user_id: userId },
  });
  return results;
}

export async function getBestResults(): Promise<Result[]> {
  const result = await Database.result.findMany({
    take: 100,
    orderBy: { value: "desc" },
  });
  return result;
}

export async function addResult(userid: string, value: number) {
  const result = await Database.result.create({
    data: { user_id: userid, value: value },
  });

  console.log(result);

  return result;
}
