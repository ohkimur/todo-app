import { z } from 'zod'

export const userSchema = z
  .object({
    id: z.number(),
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
  })
  .strip()

export type UserSchema = z.infer<typeof userSchema>

export const loginUserSchema = userSchema
  .pick({ email: true })
  .extend({
    password: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' }),
  })
  .strip()

export type LoginUserSchema = z.infer<typeof loginUserSchema>

export const registerUserSchema = userSchema
  .pick({ name: true })
  .merge(loginUserSchema)
  .extend({
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' }),
  })
  .strip()
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterUserSchema = z.infer<typeof registerUserSchema>
