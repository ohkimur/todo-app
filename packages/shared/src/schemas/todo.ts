import { z } from 'zod'

export const todoSchema = z
  .object({
    id: z.number(),
    title: z
      .string()
      .min(1, {
        message: 'Title must be at least 1 character',
      })
      .max(100, { message: 'Title must be maximum 100 characters' }),
    completed: z.boolean(),
    createdAt: z.date().or(z.string()),
  })
  .strip()

export type TodoSchema = z.infer<typeof todoSchema>

export const createTodoSchema = todoSchema
  .pick({
    title: true,
  })
  .extend({
    completed: z.boolean().optional(),
  })
  .strip()

export type CreateTodoSchema = z.infer<typeof createTodoSchema>

export const updateTodoSchema = createTodoSchema
  .partial()
  .extend({
    id: z.number(),
  })
  .strip()

export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>

export const getTodosSchema = z.object({
  completed: z.boolean().optional(),
})

export type GetTodosSchema = z.infer<typeof getTodosSchema>
