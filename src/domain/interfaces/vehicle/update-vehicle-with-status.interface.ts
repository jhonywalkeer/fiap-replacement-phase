import { VehicleStatus } from '@domain/enums'

export type UpdateVehicleWithStatus = {
  id: string
  status: VehicleStatus
}
