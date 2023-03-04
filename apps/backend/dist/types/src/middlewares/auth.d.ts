import { NextFunction, Request, Response } from 'express'
export declare const authenticate: (
  req: Request,
  _res: Response,
  next: NextFunction
) => Promise<void>
