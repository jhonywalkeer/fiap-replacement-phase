import { FindClientByIdRepository } from '@application/repositories/client'
import { StatusCode, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindClientById } from '@domain/interfaces/client'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindByIdQuery } from '@infrastructure/persistence/database/queries'

export class FindClientByIdPrismaRepository
  implements FindClientByIdRepository
{
  private readonly method: string = '[FindClientByIdPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(parameter: FindClientById): Promise<ClientEntity | null> {
    try {
      const findclient = await this.prisma.client.findUnique(
        FindByIdQuery(parameter)
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
