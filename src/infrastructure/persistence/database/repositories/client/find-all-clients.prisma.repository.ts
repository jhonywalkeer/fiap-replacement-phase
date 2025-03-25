import { FindAllClientsRepository } from '@application/repositories/client'
import { StatusCode, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllClientsQuery } from '@infrastructure/persistence/database/queries'
import { PluralWordFormat } from '@common/utils/formatters'

export class FindAllClientsPrismaRepository
  implements FindAllClientsRepository
{
  private readonly method: string = '[FindAllClientsPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    parameters: PaginationAndFilter
  ): Promise<[ClientEntity[], number] | null> {
    try {
      const { condition } = FindAllClientsQuery(parameters)
      const findClients = await this.prisma.client.findMany(condition)
      const countClients = await this.prisma.client.count()
      const notFindClients = !findClients || findClients.length === 0

      return notFindClients ? null : [findClients, countClients]
    } catch (error) {
      console.log(error)
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, PluralWordFormat(Field.Client))
    }
  }
}
