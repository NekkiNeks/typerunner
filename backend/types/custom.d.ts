declare namespace Express {
  export interface Request {
    queryParamToNumber: (paramName: string) => number | undefined;
  }
}
