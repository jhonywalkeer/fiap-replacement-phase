import { Logger } from '@infrastructure/logging'
import { PrismaClient } from '@prisma/client'
import { SaleSeeds } from './sale.seed'

const prisma = new PrismaClient()

async function main() {
  await SaleSeeds(prisma)()
  Logger.info('[Prisma] Seeds created successfully')
}

main()
  .catch((e) => {
    Logger.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
