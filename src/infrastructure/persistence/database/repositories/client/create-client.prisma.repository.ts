import { CreateClientRepository } from '@application/repositories/client'
import { Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'
import { CreateClient } from '@domain/interfaces/client'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateClientQuery } from '@infrastructure/persistence/database/queries'

export class CreateClientPrismaRepository implements CreateClientRepository {
  private readonly method: string = '[CreateClientPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(payload: CreateClient): Promise<any> {
    try {
      const createClient = await this.prisma.client.create(
        CreateClientQuery(payload)
      )
      return createClient
    } catch (error) {
      Logger.error(`${this.method} | ${error}`)
      throw new NotOccurredError(Operation.Create, Field.Client)
    }
  }
}
