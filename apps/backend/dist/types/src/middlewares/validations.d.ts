import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects } from 'zod'
export declare const validate: (
  schema: AnyZodObject | ZodEffects<AnyZodObject>
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>
export declare const invalidRoute: (_req: Request, res: Response) => void
