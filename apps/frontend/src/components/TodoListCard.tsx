import { createTodo, deleteTodo, getTodos, updateTodo } from '@/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetTodosSchema, todoSchema, TodoSchema } from '@todos/shared'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { z } from 'zod'
import { Button, Card, Input, TodoItem, TodoList } from '.'

const justTodoTileSchema = todoSchema.pick({ title: true })
type TJustTodoTitle = z.infer<typeof justTodoTileSchema>

interface ITodoListCardProps {
  title?: string
  subTitle?: string
}

export const TodoListCard = ({ title, subTitle }: ITodoListCardProps) => {
  const [filters, setFilters] = useState<GetTodosSchema>({})

  const {
    data: todos,
    isLoading,
    refetch,
  } = useQuery<TodoSchema[]>(
    ['todos', filters],
    async ({ queryKey }) => {
      const [_, currentFilters] = queryKey as [string, GetTodosSchema]
      return getTodos(currentFilters)
    },
    {
      initialData: [],
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TJustTodoTitle>({
    resolver: zodResolver(justTodoTileSchema),
  })

  const handleTodoChange = async (id: number, completed: boolean) => {
    const completedTodo = await updateTodo({
      id,
      completed,
    })
    if (completedTodo) {
      refetch()
    }
  }

  const handleTodoDelete = async (id: number) => {
    const deletedTodo = await deleteTodo(id)
    if (deletedTodo) {
      refetch()
    }
  }

  const handleTodoCreate = async (title: string) => {
    const newTodo = await createTodo({ title })
    if (newTodo) {
      refetch()
    }
  }

  const onSubmit: SubmitHandler<TJustTodoTitle> = data => {
    handleTodoCreate(data.title)
    reset()
  }

  return (
    <Card title={title} subTitle={subTitle} className='w-full max-w-[440px]'>
      <form className='mb-5' onSubmit={handleSubmit(onSubmit)}>
        <Input fullWidth placeholder='Add a new todo' {...register('title')} />
        {errors.title && (
          <span className='text-red-500'>{errors.title.message}</span>
        )}
        <button type='submit' className='hidden'>
          Create new todo
        </button>
      </form>

      <TodoList>
        {isLoading ? <p>Loading...</p> : null}
        {!isLoading && todos?.length !== 0 ? (
          todos?.map(({ id, title, completed }) => (
            <TodoItem
              id={String(id)}
              key={id}
              title={title}
              checked={completed}
              onChange={e => handleTodoChange(id, e.target.checked)}
              onDelete={() => handleTodoDelete(id)}
              disabled={isLoading}
            >
              {title}
            </TodoItem>
          ))
        ) : (
          <p>No toods.</p>
        )}
      </TodoList>

      <footer className='flex gap-3 mt-12'>
        <span>Show:</span>
        <ul className='flex gap-3'>
          <li>
            <Button
              styleType='linkCta'
              disabled={filters.completed === undefined}
              onClick={() => setFilters({})}
            >
              All
            </Button>
          </li>
          <li>
            <Button
              styleType='linkCta'
              disabled={filters.completed === true}
              onClick={() => setFilters({ completed: true })}
            >
              Completed
            </Button>
          </li>
          <li>
            <Button
              styleType='linkCta'
              disabled={filters.completed === false}
              onClick={() => setFilters({ completed: false })}
            >
              Incompleted
            </Button>
          </li>
        </ul>
      </footer>
    </Card>
  )
}
