import { NextFunction, Request, Response } from 'express'

export const getCurrentUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.json(req.user)
}
