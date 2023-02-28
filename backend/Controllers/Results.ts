import Database from "../utils/Database";
import { Result, User } from "@prisma/client";

interface ResultWithUser extends Result {
  user: Omit<User, "password">;
}

export async function getResults(userId: string): Promise<Result[]> {
  const results = await Database.result.findMany({
    where: { user_id: userId },
  });
  return results;
}

export async function getBestResults(): Promise<ResultWithUser[]> {
  const result = await Database.result.findMany({
    take: 100,
    orderBy: { value: "desc" },
    include: {
      user: true,
    },
  });

  // Omit user password from results
  const filtered = result.map((result) => {
    const { password, ...userWithoutPass } = result.user;
    result.user = userWithoutPass as User;
    return result;
  });

  return filtered;
}

export async function addResult(userid: string, value: number) {
  const result = await Database.result.create({
    data: { user_id: userid, value: value },
  });

  console.log(result);

  return result;
}
