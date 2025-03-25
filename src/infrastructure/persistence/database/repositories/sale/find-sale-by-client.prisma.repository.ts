import { FindSaleByConditionRepository } from '@application/repositories/sale'
import { DatabaseConnection } from '../../database-connection'
import { FindSaleByClient } from '@domain/interfaces'
import { Logger } from '@infrastructure/logging'
import { Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'

export class FindSaleByClientPrismaRepository
  implements FindSaleByConditionRepository
{
  private readonly method: string = '[FindSaleByClientPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(parameter: FindSaleByClient): Promise<any | null> {
    try {
      const findVehicle = await this.prisma.sale.findFirst({
        where: {
          buyer_id: parameter.buyer_id
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
