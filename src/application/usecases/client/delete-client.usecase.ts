import {
  DeleteClientRepository,
  FindClientByIdRepository
} from '@application/repositories/client'
import { FindSaleByConditionRepository } from '@application/repositories/sale'
import { StatusCode } from '@common/enums'
import { ConflictError, NotFoundError } from '@common/errors'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DeleteClient } from '@domain/interfaces/client'
import { DeleteClientUseCase } from '@domain/usecases/client'
import { Logger } from '@infrastructure/logging'

export class DeleteClientUC implements DeleteClientUseCase {
  private readonly method: string = '[DeleteClientUC]'

  constructor(
    private readonly findClientById: FindClientByIdRepository,
    private readonly findSaleByClient: FindSaleByConditionRepository,
    private readonly deleteVehicle: DeleteClientRepository
  ) {}

  async execute(payload: DeleteClient): Promise<void> {
    Logger.info(`${this.method}.execute`)

    const findClient: ClientEntity | null =
      await this.findClientById.findById(payload)

    if (!findClient) {
      Logger.error(`${this.method} | Status Code ${StatusCode.NotFound}`)
      throw new NotFoundError(Field.Client)
    }

    const findSale = await this.findSaleByClient.findByCondition({
      buyer_id: findClient.id
    })

    if (findSale) {
      Logger.error(`${this.method} | Status Code ${StatusCode.Conflict}`)
      throw new ConflictError(Field.Sale)
    }

    return await this.deleteVehicle.delete(payload)
  }
}
