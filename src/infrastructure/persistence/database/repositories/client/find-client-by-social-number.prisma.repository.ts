import { FindClientBySocialNumberRepository } from '@application/repositories/client/find-client-by-social-number.repository'
import { StatusCode, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindClientBySocialNumber } from '@domain/interfaces/client'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindClientBySocialNumberQuery } from '@infrastructure/persistence/database/queries'

export class FindClientBySocialNumberPrismaRepository
  implements FindClientBySocialNumberRepository
{
  private readonly method: string = '[FindClientBySocialNumberPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findBySocialNumber(
    parameter: FindClientBySocialNumber
  ): Promise<ClientEntity | null> {
    try {
      const findclient = await this.prisma.client.findFirst(
        FindClientBySocialNumberQuery(parameter)
      )
      return findclient
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Client)
    }
  }
}
