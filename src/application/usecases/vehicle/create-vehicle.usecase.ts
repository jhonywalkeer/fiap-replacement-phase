import { CreateVehicleUseCase } from '@domain/usecases/vehicle'
import { CreateVehicle } from '@domain/interfaces/vehicle'
import { Logger } from '@infrastructure/logging'
import { Field } from '@domain/enums'
import {
  CreateVehicleRepository,
  FindVehicleByConditionRepository
} from '@application/repositories/vehicle'
import { VehicleEntity } from '@domain/entities'
import { ConflictError } from '@common/errors'

export class CreateVehicleUC implements CreateVehicleUseCase {
  private readonly method: string = '[CreateVehicleUC]'

  constructor(
    private readonly findVehicleByCondition: FindVehicleByConditionRepository,
    private readonly createVehicle: CreateVehicleRepository
  ) {}

  async execute(payload: CreateVehicle): Promise<VehicleEntity> {
    Logger.info(`${this.method}.execute`)

    const vehicleExists =
      await this.findVehicleByCondition.findByCondition(payload)

    if (vehicleExists) {
      throw new ConflictError(Field.Vehicle)
    }

    return await this.createVehicle.create(payload)
  }
}
