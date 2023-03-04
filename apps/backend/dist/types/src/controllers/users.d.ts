import { NextFunction, Request, Response } from 'express'
export declare const getCurrentUser: (
  req: Request,
  res: Response,
  _next: NextFunction
) => Promise<void>
