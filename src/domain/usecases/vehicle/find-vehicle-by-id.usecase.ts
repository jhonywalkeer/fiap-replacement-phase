import { VehicleEntity } from '@domain/entities'
import { FindVehicleById } from '@domain/interfaces/vehicle'

export interface FindVehicleByIdUseCase {
  execute(payload: FindVehicleById): Promise<VehicleEntity> | never
}
