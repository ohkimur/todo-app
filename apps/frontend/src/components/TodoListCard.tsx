import { createTodo, deleteTodo, getTodos, updateTodo } from '@/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetTodosSchema, todoSchema, TodoSchema } from '@todos/shared'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { z } from 'zod'
import { Button, Card, Input, TodoItem, TodoList } from '.'

const justTodoTileSchema = todoSchema.pick({ title: true })
type TJustTodoTitle = z.infer<typeof justTodoTileSchema>

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
  } = useForm<TJustTodoTitle>({
    resolver: zodResolver(justTodoTileSchema),
  })

  const { data: todos, isLoading } = useQuery<TodoSchema[]>(
    ['todos', filters],
    async ({ queryKey }) => {
      const [_, currentFilters] = queryKey as [unknown, GetTodosSchema]
      return getTodos(currentFilters as GetTodosSchema)
    },
    {
      initialData: [],
    }
  )

  const getOptimisticTodos = async (
    setOptimisticQueryData: (
      previousTodos: TodoSchema[] | undefined
    ) => TodoSchema[]
  ) => {
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(['todos', filters])

    // Snapshot the previous value
    const previousTodos = queryClient.getQueryData<TodoSchema[]>([
      'todos',
      filters,
    ])

    // Optimistically update to the new value
    queryClient.setQueryData<TodoSchema[]>(
      ['todos', filters],
      setOptimisticQueryData
    )

    // Return a context object with the snapshotted value
    return { previousTodos }
  }

  const onOptimisticError = (
    _error: unknown,
    _newTodo: unknown,
    context: { previousTodos: TodoSchema[] | undefined } | undefined
  ) => {
    queryClient.setQueryData(['todos', filters], context?.previousTodos || [])
  }

  const onOptimisticSettled = () => {
    queryClient.invalidateQueries(['todos', filters])
  }

  const { mutate: updateTodoWithMutation } = useMutation(updateTodo, {
    onMutate: async updatedTodo => {
      return await getOptimisticTodos(previousTodos => {
        if (!previousTodos) return []
        return previousTodos.map(todo =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
        )
      })
    },
    onError: onOptimisticError,
    onSettled: onOptimisticSettled,
  })

  const { mutate: deleteTodoWithMutation } = useMutation(deleteTodo, {
    onMutate: async deletedTodoId => {
      return await getOptimisticTodos(previousTodos => {
        if (!previousTodos) return []
        return previousTodos.filter(todo => todo.id !== deletedTodoId)
      })
    },
    onError: onOptimisticError,
    onSettled: onOptimisticSettled,
  })

  const { mutate: createTodoWithMutation } = useMutation(createTodo, {
    onMutate: async newTodo => {
      return await getOptimisticTodos(previousTodos => {
        if (!previousTodos) return []
        return [
          ...previousTodos,
          { id: 0, completed: false, createdAt: '', ...newTodo },
        ]
      })
    },
  })

  const onSubmit: SubmitHandler<TJustTodoTitle> = data => {
    createTodoWithMutation({ title: data.title })
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
              onChange={e =>
                updateTodoWithMutation({
                  id: Number(e.target.id),
                  completed: e.target.checked,
                })
              }
              onDelete={() => deleteTodoWithMutation(id)}
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
