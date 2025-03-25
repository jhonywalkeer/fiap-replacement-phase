import { DeleteVehicle } from '@domain/interfaces/vehicle'

export interface DeleteVehicleUseCase {
  execute(pathParameter: DeleteVehicle): Promise<void>
}
