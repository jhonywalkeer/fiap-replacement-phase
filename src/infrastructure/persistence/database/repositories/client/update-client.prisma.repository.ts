import { UpdateClientRepository } from '@application/repositories/client'
import { Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateClient } from '@domain/interfaces/client'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { UpdateClientQuery } from '@infrastructure/persistence/database/queries'

export class UpdateClientPrismaRepository implements UpdateClientRepository {
  private readonly method: string = '[UpdateClientPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async update(payload: UpdateClient): Promise<ClientEntity> {
    try {
      const updateClient = await this.prisma.client.update(
        UpdateClientQuery(payload)
      )
      return updateClient
    } catch (error) {
      Logger.error(`${this.method} | ${error}`)
      throw new NotOccurredError(Operation.Create, Field.Vehicle)
    }
  }
}
