import { UpdateVehicleRepository } from '@application/repositories/vehicle'
import { Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { VehicleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateVehicle } from '@domain/interfaces/vehicle'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { UpdateVehicleQuery } from '@infrastructure/persistence/database/queries'

export class UpdateVehiclePrismaRepository implements UpdateVehicleRepository {
  private readonly method: string = '[UpdateVehiclePrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async update(payload: UpdateVehicle): Promise<VehicleEntity> {
    try {
      const updateVehicle = await this.prisma.vehicle.update(
        UpdateVehicleQuery(payload)
      )
      return updateVehicle as unknown as VehicleEntity
    } catch (error) {
      Logger.error(`${this.method} | ${error}`)
      throw new NotOccurredError(Operation.Create, Field.Vehicle)
    }
  }
}
