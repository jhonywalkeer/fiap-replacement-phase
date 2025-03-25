import { FindAllClientsRepository } from '@application/repositories/client'
import { NotFoundError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllClientsUseCase } from '@domain/usecases/client'
import { Logger } from '@infrastructure/logging'

export class FindAllClientsUC implements FindAllClientsUseCase {
  private readonly method: string = '[FindAllClientUC]'

  constructor(private readonly findAllClients: FindAllClientsRepository) {}

  async execute(
    payload: PaginationAndFilter
  ): Promise<[ClientEntity[], number]> {
    Logger.info(`${this.method}.execute`)

    const findClient: [ClientEntity[], number] | null =
      await this.findAllClients.findAll(payload)

    if (!findClient) {
      throw new NotFoundError(Field.Client)
    }

    return findClient
  }
}
