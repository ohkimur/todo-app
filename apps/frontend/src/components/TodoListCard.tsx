import { createTodo, deleteTodo, getTodos, updateTodo } from '@/api'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  CreateTodoSchema,
  createTodoSchema,
  GetTodosSchema,
  TodoSchema,
} from '@todos/shared'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Card, Input, TodoItem, TodoList, TodoListPlaceholder } from '.'

interface ITodoListCardProps {
  title?: string
  subTitle?: string
}

export const TodoListCard = ({ title, subTitle }: ITodoListCardProps) => {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState<GetTodosSchema>({})

  const [animationParent] = useAutoAnimate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
  })

  const {
    isLoading,
    isError,
    data: todos,
    error,
  } = useQuery<TodoSchema[]>({
    queryKey: ['todos', filters],
    queryFn: () => getTodos(filters),
  })

  // INFO: More info about optimistic updates: https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
  const { mutate: createTodoWithMutation } = useMutation({
    mutationFn: createTodo,
    onMutate: async newTodo => {
      await queryClient.cancelQueries({ queryKey: ['todos', filters] })
      const previousTodos = queryClient.getQueryData(['todos', filters])

      queryClient.setQueryData<TodoSchema[]>(['todos', filters], oldTodos => {
        const optimisticId = oldTodos?.length
          ? oldTodos[oldTodos.length - 1].id + 1
          : 1
        const optimisticNewTodo = {
          ...newTodo,
          id: optimisticId,
          completed: false,
          createdAt: new Date().toISOString(),
        }
        return [...(oldTodos || []), optimisticNewTodo]
      })

      return { previousTodos }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(['todos', filters], context?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', filters] })
    },
  })

  const { mutate: deleteTodoWithMutation } = useMutation({
    mutationFn: deleteTodo,
    onMutate: async todoId => {
      await queryClient.cancelQueries({ queryKey: ['todos', filters] })
      const previousTodos = queryClient.getQueryData(['todos', filters])

      queryClient.setQueryData<TodoSchema[]>(['todos', filters], oldTodos => {
        return oldTodos?.filter(todo => todo.id !== todoId)
      })

      return { previousTodos }
    },
    onError: (_err, _todoId, context) => {
      queryClient.setQueryData(['todos', filters], context?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', filters] })
    },
  })

  const { mutate: updateTodoWithMutation } = useMutation({
    mutationFn: updateTodo,
    onMutate: async updatedTodo => {
      await queryClient.cancelQueries({ queryKey: ['todos', filters] })
      const previousTodos = queryClient.getQueryData(['todos', filters])

      queryClient.setQueryData<TodoSchema[]>(['todos', filters], oldTodos => {
        return oldTodos?.map(todo => {
          if (todo.id === updatedTodo.id) {
            return { ...todo, ...updatedTodo }
          }
          return todo
        })
      })

      return { previousTodos }
    },
    onError: (_err, _todo, context) => {
      queryClient.setQueryData(['todos', filters], context?.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', filters] })
    },
  })

  const onSubmit: SubmitHandler<CreateTodoSchema> = newTodo => {
    createTodoWithMutation(newTodo)
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

      {isLoading ? <TodoListPlaceholder /> : null}

      <TodoList ref={animationParent}>
        {todos?.length !== 0
          ? todos?.map(({ id, title, completed }) => (
              <TodoItem
                id={String(id)}
                key={id}
                title={title}
                checked={completed}
                onChange={e => {
                  updateTodoWithMutation({
                    id: Number(e.target.id),
                    completed: e.target.checked,
                  })
                }}
                onDelete={() => deleteTodoWithMutation(id)}
                disabled={isLoading}
              >
                {title}
              </TodoItem>
            ))
          : null}
      </TodoList>
      {isError && (
        <span className='text-red-500'>{(error as Error)?.message}</span>
      )}
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
