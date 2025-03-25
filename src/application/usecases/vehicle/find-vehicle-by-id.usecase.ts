import { FindVehicleByIdRepository } from '@application/repositories/vehicle'
import { NotFoundError } from '@common/errors'
import { VehicleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindVehicleById } from '@domain/interfaces/vehicle'
import { FindVehicleByIdUseCase } from '@domain/usecases/vehicle'
import { Logger } from '@infrastructure/logging'

export class FindVehicleByIdUC implements FindVehicleByIdUseCase {
  private readonly method: string = '[FindVehicleByIdUC]'

  constructor(private readonly findVehicleById: FindVehicleByIdRepository) {}

  async execute(payload: FindVehicleById): Promise<VehicleEntity> {
    Logger.info(`${this.method}.execute`)

    const findVehicle: VehicleEntity | null =
      await this.findVehicleById.findById(payload)

    if (!findVehicle) {
      throw new NotFoundError(Field.Vehicle)
    }

    return findVehicle
  }
}
