import argon2 from 'argon2'
import { prisma } from './client'

const users = [
  {
    name: 'admin',
    email: 'admin@test.com',
    password: 'admin123',
  },
  {
    name: 'Test',
    email: 'test@test.com',
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

const deleteData = async () => {
  console.log('Delete all existing todos and users ...')

  await prisma.todo.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('Deleted all existing todos and users.')
}

const seed = async () => {
  console.log('Start seeding ...')

  const hashedUsers = await Promise.all(
    users.map(async user => ({
      ...user,
      password: await argon2.hash(user.password),
    }))
  )

  await prisma.user.createMany({
    data: hashedUsers,
  })

  const firstUser = await prisma.user.findUnique({
    where: {
      email: users[0].email,
    },
  })

  if (!firstUser) {
    throw new Error('User not found')
  }

  await prisma.todo.createMany({
    data: todos.map(todo => ({
      ...todo,
      userId: firstUser.id,
    })),
  })

  console.log('Seeding finished.')
}

const main = async () => {
  await deleteData()
  await seed()
}

main()
