import {
  completeTodo,
  createTodo,
  deleteTodo,
  getTodos,
  uncompleteTodo,
} from '@/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { todoSchema, TTodo } from '@todos/shared'
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

type Filter = 'all' | 'completed' | 'uncompleted'

export const TodoListCard = ({ title, subTitle }: ITodoListCardProps) => {
  const [filter, setFilter] = useState<Filter>('all')

  const {
    data: todos,
    isLoading,
    error,
    refetch,
  } = useQuery<TTodo[]>(
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
  } = useForm<TJustTodoTitle>({
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
