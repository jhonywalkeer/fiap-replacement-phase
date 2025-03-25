import { FindSaleByConditionRepository } from '@application/repositories/sale'
import { Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'
import { FindSaleByCondition } from '@domain/interfaces/sale'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindSaleByConditionPrismaRepository
  implements FindSaleByConditionRepository
{
  private readonly method: string = '[FindSaleByConditionPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(parameter: FindSaleByCondition): Promise<any | null> {
    try {
      const findVehicle = await this.prisma.sale.findFirst({
        where: {
          vehicle_id: parameter.vehicle_id,
          buyer_id: parameter.buyer_id,
          payment_id: parameter.payment_id
        }
      })
      return findVehicle ?? null
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Vehicle)
    }
  }
}
