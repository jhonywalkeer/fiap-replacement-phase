import { FindClientByConditionRepository } from '@application/repositories/client'
import { Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindClientByCondition } from '@domain/interfaces/client'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindClientByConditionQuery } from '@infrastructure/persistence/database/queries'

export class FindClientByConditionPrismaRepository
  implements FindClientByConditionRepository
{
  private readonly method: string = '[FindClientByConditionPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    parameter: FindClientByCondition
  ): Promise<ClientEntity | null> {
    try {
      const findVehicle = await this.prisma.client.findFirst(
        FindClientByConditionQuery(parameter)
      )
      return findVehicle ?? null
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Client)
    }
  }
}
