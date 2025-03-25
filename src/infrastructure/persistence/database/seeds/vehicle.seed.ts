import { PrismaClient } from '@prisma/client'

export const VehicleSeeds = (orm: PrismaClient) => async () => {
  await orm.vehicle.createMany({
    data: []
  })
}
