import { DeleteClientRepository } from '@application/repositories/client'
import { Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'
import { DeleteClient } from '@domain/interfaces/client'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { DeleteByIdQuery } from '@infrastructure/persistence/database/queries'

export class DeleteClientPrismaRepository implements DeleteClientRepository {
  private readonly method: string = '[DeleteClientPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async delete(pathParameter: DeleteClient): Promise<void> {
    try {
      await this.prisma.client.delete(DeleteByIdQuery(pathParameter))
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Delete, Field.Vehicle)
    }
  }
}
