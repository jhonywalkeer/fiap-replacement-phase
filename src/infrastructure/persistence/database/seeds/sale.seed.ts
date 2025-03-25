import { PrismaClient } from '@prisma/client'

export const SaleSeeds = (orm: PrismaClient) => async () => {
  await orm.sale.createMany({
    data: []
  })
}
