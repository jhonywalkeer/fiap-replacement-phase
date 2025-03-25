import { DeleteVehicleRepository } from '@application/repositories/vehicle'
import { Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'
import { DeleteVehicle } from '@domain/interfaces/vehicle'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class DeleteVehiclePrismaRepository implements DeleteVehicleRepository {
  private readonly method: string = '[DeleteVehiclePrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async delete(pathParameter: DeleteVehicle): Promise<void> {
    try {
      await this.prisma.vehicle.delete({
        where: {
          id: pathParameter.id
        }
      })
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Delete, Field.Vehicle)
    }
  }
}
