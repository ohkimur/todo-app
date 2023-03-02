import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users = [
  {
    name: 'Kimur',
    email: 'ohkimur@gmail.com',
    password: 'desene123',
  },
  {
    name: 'Test',
    email: 'test@gmail.com',
    password: 'test123',
  },
]

const todos = [
  {
    title: 'Learn Next.js',
    completed: false,
  },
  {
    title: 'Learn React',
    completed: false,
  },
  {
    title: 'Learn GraphQL',
    completed: false,
  },
]

const main = async () => {
  console.log('Start seeding ...')

  await prisma.user.createMany({
    data: users,
  })

  const firstUser = await prisma.user.findUnique({
    where: {
      email: users[0].email,
    },
  })

  if (!firstUser) throw new Error('User not found')

  await prisma.todo.createMany({
    data: todos.map(todo => ({
      ...todo,
      userId: firstUser.id,
    })),
  })

  console.log('Seeding finished.')
}

main()
