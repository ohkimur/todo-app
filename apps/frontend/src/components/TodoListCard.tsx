import { getTodos } from '@/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  CreateTodoSchema,
  createTodoSchema,
  GetTodosSchema,
  TodoSchema,
} from '@todos/shared'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Card, Input, TodoItem, TodoList } from '.'

interface ITodoListCardProps {
  title?: string
  subTitle?: string
}

export const TodoListCard = ({ title, subTitle }: ITodoListCardProps) => {
  const queryClient = useQueryClient()

  const [filters, setFilters] = useState<GetTodosSchema>({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
  })

  // const { data: todos, isLoading } = useQuery<TodoSchema[]>(
  //   ['todos', filters],
  //   async ({ queryKey }) => {
  //     const [_, currentFilters] = queryKey as [unknown, GetTodosSchema]
  //     return getTodos(currentFilters as GetTodosSchema)
  //   },
  //   {
  //     initialData: [],
  //   }
  // )

  const {
    isLoading,
    isError,
    data: todos,
    error,
  } = useQuery<TodoSchema[]>({
    queryKey: ['todos', filters],
    queryFn: async ({ queryKey }) => {
      const [_key, filters] = queryKey as [unknown, GetTodosSchema]
      return getTodos(filters)
    },
  })

  const onSubmit: SubmitHandler<CreateTodoSchema> = data => {
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
              onChange={_e => {
                console.log('TODO: update todo')
              }}
              onDelete={() => console.log('TODO: delete todo')}
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
