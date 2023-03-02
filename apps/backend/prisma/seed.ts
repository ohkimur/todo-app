import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users = [
  {
    email: 'ohkimur@gmail.com',
    password: 'desene123',
  },
  {
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
