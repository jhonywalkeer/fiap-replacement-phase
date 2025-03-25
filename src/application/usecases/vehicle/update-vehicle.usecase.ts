import {
  UpdateVehicleRepository,
  FindVehicleByIdRepository
} from '@application/repositories/vehicle'
import { StatusCode } from '@common/enums'
import { NotFoundError } from '@common/errors'
import { VehicleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateVehicle } from '@domain/interfaces/vehicle'
import { UpdateVehicleUseCase } from '@domain/usecases/vehicle'
import { Logger } from '@infrastructure/logging'

export class UpdateVehicleUC implements UpdateVehicleUseCase {
  private readonly method: string = '[UpdateVehicleUC]'

  constructor(
    private readonly findVehicleById: FindVehicleByIdRepository,
    private readonly updateVehicle: UpdateVehicleRepository
  ) {}

  async execute(payload: UpdateVehicle): Promise<VehicleEntity> {
    Logger.info(`${this.method}.execute`)

    const findVehicle: VehicleEntity | null =
      await this.findVehicleById.findById(payload)

    if (!findVehicle) {
      Logger.error(`${this.method} | Status Code ${StatusCode.NotFound}`)
      throw new NotFoundError(Field.Vehicle)
    }

    const updatedVehicle: VehicleEntity | null =
      await this.updateVehicle.update({
        id: payload.id,
        brand: payload.brand ?? findVehicle.brand,
        model: payload.model ?? findVehicle.model,
        year: payload.year ?? findVehicle.year,
        color: payload.color ?? findVehicle.color,
        price: payload.price ?? findVehicle.price,
        fuel: payload.fuel ?? findVehicle.fuel,
        status: payload.status ?? findVehicle.status
      })

    return updatedVehicle!
  }
}
