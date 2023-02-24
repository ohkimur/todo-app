import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' }),
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters' })
    .optional(),
})

export type TUser = z.infer<typeof userSchema>

export const authenticatedUserSchema = z
  .object({
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    fullName: z
      .string()
      .min(3, { message: 'Full name must be at least 3 characters' }),
  })
  .strict()
  .strip()

export type TAuthenticatedUser = z.infer<typeof authenticatedUserSchema>
