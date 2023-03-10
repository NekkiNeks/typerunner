import Database from "../utils/Database";
import { Result, User } from "@prisma/client";

interface ResultWithUser extends Result {
  user: Omit<User, "password">;
}

export async function getLastResults(userId: string): Promise<Result[]> {
  const results = await Database.result.findMany({
    where: { user_id: userId },
    take: 10,
  });
  return results;
}

export async function getAllResults(userId: string): Promise<Result[]> {
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
    where: {
      user: {
        verified: true,
      },
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

export async function getBestResultsPaginated(
  pageSize: number = 15,
  pageNumber: number = 1
): Promise<ResultWithUser[]> {
  const skip = pageSize * (pageNumber - 1);

  const date = new Date();
  date.setDate(date.getDate() - 1);
  console.log(date.toISOString());

  const result = await Database.result.findMany({
    skip,
    take: pageSize,
    orderBy: { value: "desc" },
    distinct: ["user_id"],
    include: {
      user: true,
    },
    where: {
      AND: {
        user: {
          verified: true,
        },
        created_at: {
          gt: date.toISOString(),
        },
      },
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
