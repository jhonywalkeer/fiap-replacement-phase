import { UpdateVehicleStatusRepository } from '@application/repositories/vehicle'
import { Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { VehicleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateVehicleWithStatus } from '@domain/interfaces/vehicle'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class UpdateVehicleStatusPrismaRepository
  implements UpdateVehicleStatusRepository
{
  private readonly method: string = '[UpdateVehicleStatusPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async updateVehicleWithStatus(
    payload: UpdateVehicleWithStatus
  ): Promise<VehicleEntity> {
    try {
      const updateVehicle = await this.prisma.vehicle.update({
        where: {
          id: payload.id
        },
        data: {
          status: payload.status
        }
      })
      return updateVehicle as unknown as VehicleEntity
    } catch (error) {
      Logger.error(`${this.method} | ${error}`)
      throw new NotOccurredError(Operation.Create, Field.Vehicle)
    }
  }
}
