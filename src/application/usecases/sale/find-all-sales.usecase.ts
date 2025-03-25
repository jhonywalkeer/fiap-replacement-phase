import { FindAllSalesRepository } from '@application/repositories/sale'
import { NotFoundError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { SaleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllSalesUseCase } from '@domain/usecases/sale'
import { Logger } from '@infrastructure/logging'

export class FindAllSalesUC implements FindAllSalesUseCase {
  private readonly method: string = '[FindAllSalesUC]'

  constructor(private readonly findAllVehicles: FindAllSalesRepository) {}

  async execute(payload: PaginationAndFilter): Promise<[SaleEntity, number]> {
    Logger.info(`${this.method}.execute`)

    const findVehicle: [SaleEntity, number] | null =
      await this.findAllVehicles.findAll(payload)

    if (!findVehicle) {
      throw new NotFoundError(Field.Sale)
    }

    return findVehicle
  }
}
