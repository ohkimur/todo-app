import { zodResolver } from '@hookform/resolvers/zod'
import { todoSchema } from '@todos/shared'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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

export const TodoListCard = ({ title, subTitle }: ITodoListCardProps) => {
  const [todos, setTodos] = useState(initialTodos)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JustTodoTitleSchema>({
    resolver: zodResolver(justTodoTileSchema),
  })

  const handleTodoChange = (id: number, completed: boolean) => {
    setTodos(todos =>
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed,
          }
        }
        return todo
      })
    )
  }

  const handleTodoDelete = (id: number) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  const onSubmit: SubmitHandler<JustTodoTitleSchema> = data => {
    console.log(data)
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
        {todos.map(({ id, title, completed }) => (
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
        ))}
      </TodoList>

      <footer className='flex gap-3 mt-12'>
        <span>Show:</span>
        <ul className='flex gap-3'>
          <li>
            <Button styleType='linkCta'>All</Button>
          </li>
          <li>
            <Button styleType='linkCta'>Completed</Button>
          </li>
          <li>
            <Button styleType='linkCta'>Incompleted</Button>
          </li>
        </ul>
      </footer>
    </Card>
  )
}
