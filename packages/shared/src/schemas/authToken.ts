import { z } from 'zod'

export const authTokenSchema = z.object({
  id: z.number(),
  userId: z.number(),
  token: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

export type TAuthToken = z.infer<typeof authTokenSchema>
