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

const main = async () => {
  await prisma.user.createMany({
    data: users,
  })
}

main()
