import { VehicleEntity } from '@domain/entities'
import { CreateVehicle } from '@domain/interfaces/vehicle'

export interface CreateVehicleUseCase {
  execute(payload: CreateVehicle): Promise<VehicleEntity> | never
}
