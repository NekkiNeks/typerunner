import { Request, Response, NextFunction } from "express";

export default function parsers(
  req: Request,
  res: Response,
  next: NextFunction
) {

  // получить число из query параметров, и undefined в случае ошибки 
  req.queryParamToNumber = function (paramName: string): number | undefined {
    const param = this.query[paramName];
    if (!param) return;
    const parsed = parseInt(param.toString(), 10);
    if (isNaN(parsed)) return;
    return parsed;
  };

  next();
}
