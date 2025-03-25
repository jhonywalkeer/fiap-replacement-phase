import { VehicleEntity } from '@domain/entities'
import { UpdateVehicle } from '@domain/interfaces/vehicle'

export interface UpdateVehicleUseCase {
  execute(payload: UpdateVehicle): Promise<VehicleEntity> | never
}
