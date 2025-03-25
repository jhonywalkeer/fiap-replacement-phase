import { FindVehicleByIdRepository } from '@application/repositories/vehicle'
import { StatusCode, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { VehicleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindVehicleById } from '@domain/interfaces/vehicle'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindVehicleByIdPrismaRepository
  implements FindVehicleByIdRepository
{
  private readonly method: string = '[FindVehicleByIdPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(parameter: FindVehicleById): Promise<VehicleEntity | null> {
    try {
      const findVehicle = await this.prisma.vehicle.findUnique({
        where: { id: parameter.id }
      })
      return findVehicle
        ? {
            ...findVehicle,
            status: findVehicle?.status as any,
            fuel: findVehicle?.fuel as any,
            price: findVehicle?.price as any
          }
        : null
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Vehicle)
    }
  }
}
