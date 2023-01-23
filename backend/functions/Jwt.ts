import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getApiResponse } from "../utils/Format";

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
    if (!req.headers.authorization) throw new Error("Токен не был передан");
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, "mysecretkey");
    if (typeof payload == "string") throw new Error("Неверный формат токена");
    res.locals.user = { id: payload.userId };
    next();
  } catch (err) {
    const response = getApiResponse(false, null, "Токен не прошел валидацию");
    res.status(401).send(response);
  }
}
