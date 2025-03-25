import {
  DeleteVehicleRepository,
  FindVehicleByIdRepository
} from '@application/repositories/vehicle'
import { StatusCode } from '@common/enums'
import { NotFoundError } from '@common/errors'
import { VehicleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DeleteVehicle } from '@domain/interfaces/vehicle'
import { DeleteVehicleUseCase } from '@domain/usecases/vehicle'
import { Logger } from '@infrastructure/logging'

export class DeleteVehicleUC implements DeleteVehicleUseCase {
  private readonly method: string = '[DeleteVehicleUC]'

  constructor(
    private readonly findVehicleById: FindVehicleByIdRepository,
    private readonly deleteVehicle: DeleteVehicleRepository
  ) {}

  async execute(payload: DeleteVehicle): Promise<void> {
    Logger.info(`${this.method}.execute`)

    const findVehicle: VehicleEntity | null =
      await this.findVehicleById.findById(payload)

    if (!findVehicle) {
      Logger.error(`${this.method} | Status Code ${StatusCode.NotFound}`)
      throw new NotFoundError(Field.Vehicle)
    }

    return await this.deleteVehicle.delete(payload)
  }
}
