import { z } from 'zod'

export const todoSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1, {
      message: 'Title must be at least 1 character',
    })
    .max(100, { message: 'Title must be maximum 100 characters' }),
  completed: z.boolean(),
  // createdAt: z.date().or(z.string()),
  // updatedAt: z.date().or(z.string()),
})

export type TodoSchema = z.infer<typeof todoSchema>
