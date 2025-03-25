import { FindVehicleByConditionRepository } from '@application/repositories/vehicle'
import { Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'
import { FindVehicleByCondition } from '@domain/interfaces/vehicle/find-vehicle-by-condition.interface'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindVehicleByConditionQuery } from '@infrastructure/persistence/database/queries'

export class FindVehicleByConditionPrismaRepository
  implements FindVehicleByConditionRepository
{
  private readonly method: string = '[FindVehicleByConditionPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    parameter: FindVehicleByCondition
  ): Promise<any | null> {
    try {
      const findVehicle = await this.prisma.vehicle.findFirst(
        FindVehicleByConditionQuery(parameter)
      )
      return findVehicle ?? null
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Vehicle)
    }
  }
}
