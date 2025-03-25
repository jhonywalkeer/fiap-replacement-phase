import { FindSaleByIdUseCase } from '@domain/usecases/sale'
import { SaleEntity } from '@domain/entities'
import { FindSaleById } from '@domain/interfaces/sale'
import { Field } from '@domain/enums'
import { Logger } from '@infrastructure/logging'
import { NotFoundError } from '@common/errors'
import { FindSaleByIdRepository } from '@application/repositories/sale'

export class FindSaleByIdUC implements FindSaleByIdUseCase {
  private readonly method: string = '[FindSaleByIdUC]'
  constructor(private readonly findSaleById: FindSaleByIdRepository) {}

  async execute(parameter: FindSaleById): Promise<SaleEntity> {
    Logger.info(`${this.method}.execute`)

    const findVehicle: SaleEntity | null =
      await this.findSaleById.findById(parameter)

    if (!findVehicle) {
      throw new NotFoundError(Field.Sale)
    }

    return findVehicle
  }
}
