import { FindClientBySocialNumberRepository } from '@application/repositories/client'
import { NotFoundError } from '@common/errors'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindClientBySocialNumber } from '@domain/interfaces/client'
import { FindClientBySocialNumberUseCase } from '@domain/usecases/client'
import { Logger } from '@infrastructure/logging'

export class FindClientBySocialNumberUC
  implements FindClientBySocialNumberUseCase
{
  private readonly method: string = '[FindClientBySocialNumberUC]'

  constructor(
    private readonly findClientBySocialNumber: FindClientBySocialNumberRepository
  ) {}

  async execute(payload: FindClientBySocialNumber): Promise<ClientEntity> {
    Logger.info(`${this.method}.execute`)

    const findClient: ClientEntity | null =
      await this.findClientBySocialNumber.findBySocialNumber(payload)

    if (!findClient) {
      throw new NotFoundError(Field.Client)
    }

    return findClient
  }
}
