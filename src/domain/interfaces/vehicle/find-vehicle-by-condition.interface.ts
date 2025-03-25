import { VehicleStatus } from '@domain/enums'
import { Vehicle } from '@domain/interfaces/vehicle'

export type FindVehicleByCondition = {
  brand: Vehicle['brand']
  model: Vehicle['model']
  fuel: Vehicle['fuel']
  year: Vehicle['year']
  color: Vehicle['color']
  price: Vehicle['price']
  sale_id: Vehicle['sale_id']
  status: VehicleStatus.Available
}
