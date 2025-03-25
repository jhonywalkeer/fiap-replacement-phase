import { FindAllVehiclesRepository } from '@application/repositories/vehicle'
import { NotFoundError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { VehicleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllVehiclesUseCase } from '@domain/usecases/vehicle'
import { Logger } from '@infrastructure/logging'

export class FindAllVehiclesUC implements FindAllVehiclesUseCase {
  private readonly method: string = '[FindAllVehiclesUC]'

  constructor(private readonly findAllVehicles: FindAllVehiclesRepository) {}

  async execute(
    payload: PaginationAndFilter
  ): Promise<[VehicleEntity, number]> {
    Logger.info(`${this.method}.execute`)

    const findVehicle: [VehicleEntity, number] | null =
      await this.findAllVehicles.findAll(payload)

    if (!findVehicle) {
      throw new NotFoundError(Field.Vehicle)
    }

    return findVehicle
  }
}
