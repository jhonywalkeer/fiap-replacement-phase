import { FindPaymentByConditionRepository } from '@application/repositories/payment'
import { Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'
import { FindPaymentByCondition } from '@domain/interfaces/payment'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindPaymentByConditionQuery } from '@infrastructure/persistence/database/queries'

export class FindPaymentByConditionPrismaRepository
  implements FindPaymentByConditionRepository
{
  private readonly method: string = '[FindPaymentByConditionPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    parameter: FindPaymentByCondition
  ): Promise<any | null> {
    try {
      const findVehicle = await this.prisma.payment.findFirst(
        FindPaymentByConditionQuery(parameter)
      )
      return findVehicle ?? null
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Payment)
    }
  }
}
