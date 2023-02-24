import {
  completeTodo,
  createTodo,
  deleteTodo,
  getTodos,
  uncompleteTodo,
} from '@/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { TodoSchema, todoSchema } from '@todos/shared'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { z } from 'zod'
import { Button, Card, Input, TodoItem, TodoList } from '.'

const initialTodos = [
  {
    id: 1,
    title: 'Get insomnia 1',
    completed: false,
    createdAt: '2023-02-23T18:41:22.839Z',
    updatedAt: '2023-02-23T18:41:22.839Z',
  },
  {
    id: 2,
    title: 'Get insomnia 2',
    completed: true,
    createdAt: '2023-02-23T18:41:22.839Z',
    updatedAt: '2023-02-23T18:41:22.839Z',
  },
]

const justTodoTileSchema = todoSchema.pick({ title: true })
type JustTodoTitleSchema = z.infer<typeof justTodoTileSchema>

interface ITodoListCardProps {
  title?: string
  subTitle?: string
}

type Filter = 'all' | 'completed' | 'uncompleted'

export const TodoListCard = ({ title, subTitle }: ITodoListCardProps) => {
  const [filter, setFilter] = useState<Filter>('all')

  const {
    data: todos,
    isLoading,
    error,
    refetch,
  } = useQuery<TodoSchema[]>(
    ['todos', filter],
    async ({ queryKey }) => {
      const [_, currentFilter] = queryKey as [string, Filter]
      return getTodos(currentFilter)
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
  } = useForm<JustTodoTitleSchema>({
    resolver: zodResolver(justTodoTileSchema),
  })

  const handleTodoChange = async (id: number, completed: boolean) => {
    if (!completed) {
      const uncompletedTodo = await uncompleteTodo(id)
      if (uncompletedTodo) {
        refetch()
      }
      return
    }

    const completedTodo = await completeTodo(id)
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

  const onSubmit: SubmitHandler<JustTodoTitleSchema> = data => {
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
        {!isLoading ? (
          todos?.map(({ id, title, completed }) => (
            <TodoItem
              id={String(id)}
              key={id}
              title={title}
              checked={completed}
              onChange={e => handleTodoChange(id, e.target.checked)}
              onDelete={() => handleTodoDelete(id)}
            >
              {title}
            </TodoItem>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </TodoList>

      <footer className='flex gap-3 mt-12'>
        <span>Show:</span>
        <ul className='flex gap-3'>
          <li>
            <Button
              styleType='linkCta'
              disabled={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
          </li>
          <li>
            <Button
              styleType='linkCta'
              disabled={filter === 'completed'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </li>
          <li>
            <Button
              styleType='linkCta'
              disabled={filter === 'uncompleted'}
              onClick={() => setFilter('uncompleted')}
            >
              Incompleted
            </Button>
          </li>
        </ul>
      </footer>
    </Card>
  )
}
