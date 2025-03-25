import { CreateClientUseCase } from '@domain/usecases/client'
import { CreateClient } from '@domain/interfaces/client'
import { Logger } from '@infrastructure/logging'
import { Field } from '@domain/enums'
import {
  CreateClientRepository,
  FindClientByConditionRepository
} from '@application/repositories/client'
import { ConflictError } from '@common/errors'
import { ClientEntity } from '@domain/entities'

export class CreateClientUC implements CreateClientUseCase {
  private readonly method: string = '[CreateClientUC]'

  constructor(
    private readonly findClientByCondition: FindClientByConditionRepository,
    private readonly createClient: CreateClientRepository
  ) {}

  async execute(payload: CreateClient): Promise<ClientEntity> {
    Logger.info(`${this.method}.execute`)

    const clientExists: ClientEntity | null =
      await this.findClientByCondition.findByCondition(payload)

    if (clientExists) {
      throw new ConflictError(Field.Client)
    }

    return await this.createClient.create(payload)
  }
}
