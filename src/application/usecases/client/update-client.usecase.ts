import { FindClientByIdRepository } from '@application/repositories/client'
import { UpdateClientRepository } from '@application/repositories/client'
import { StatusCode } from '@common/enums'
import { NotFoundError } from '@common/errors'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateClient } from '@domain/interfaces/client'
import { UpdateClientUseCase } from '@domain/usecases/client'
import { Logger } from '@infrastructure/logging'

export class UpdateClientUC implements UpdateClientUseCase {
  private readonly method: string = '[UpdateClientUC]'

  constructor(
    private readonly findClientById: FindClientByIdRepository,
    private readonly updateClient: UpdateClientRepository
  ) {}

  async execute(payload: UpdateClient): Promise<ClientEntity> {
    Logger.info(`${this.method}.execute`)

    const findClient: ClientEntity | null =
      await this.findClientById.findById(payload)

    if (!findClient) {
      Logger.error(`${this.method} | Status Code ${StatusCode.NotFound}`)
      throw new NotFoundError(Field.Client)
    }

    const updatedVehicle: ClientEntity | null = await this.updateClient.update({
      id: payload.id,
      name: payload.name ?? findClient.name,
      mail: payload.mail ?? findClient.mail,
      social_security_number:
        payload.social_security_number ?? findClient.social_security_number,
      birth_date: payload.birth_date ?? findClient.birth_date
    })

    return updatedVehicle!
  }
}
