import { Request, Response, NextFunction } from "express";
import Logger from "../utils/Logger";
const logger = new Logger("url");

export function urlLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method} REQUEST: ${req.url}`);
  next();
}
