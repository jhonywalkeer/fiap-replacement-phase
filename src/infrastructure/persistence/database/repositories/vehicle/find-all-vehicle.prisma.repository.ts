import { FindAllVehiclesRepository } from '@application/repositories/vehicle'
import { StatusCode, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { VehicleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllVehiclesQuery } from '../../queries'

export class FindAllVehiclePrismaRepository
  implements FindAllVehiclesRepository
{
  private readonly method: string = '[FindAllVehiclePrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    parameters: PaginationAndFilter
  ): Promise<[VehicleEntity, number] | null> {
    try {
      const { condition, count } = FindAllVehiclesQuery(parameters)
      const findVehicles = await this.prisma.vehicle.findMany(condition)
      const countVehicles = await this.prisma.vehicle.count(count)

      return !findVehicles || findVehicles.length === 0
        ? null
        : ([findVehicles, countVehicles] as unknown as [VehicleEntity, number])
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Vehicle)
    }
  }
}
