import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getApiResponse } from "../utils/Format";
import { AuthError } from "../utils/Errors";

export function createJwt(userId: string) {
  const token = jwt.sign({ userId }, "mysecretkey", { expiresIn: "6h" });
  return token;
}

export function validateJwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.method === "OPTIONS") next();
    if (!req.headers.authorization) {
      throw new AuthError("Токен не был передан");
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, "mysecretkey");

    if (typeof payload == "string") {
      throw new AuthError("Неверный формат токена");
    }

    res.locals.user = { id: payload.userId };
    next();
  } catch (err: any) {
    res.send(getApiResponse(false, null, err));
  }
}
