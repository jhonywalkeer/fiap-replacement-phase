import { Fuel, VehicleStatus } from '@domain/enums'
import { FindVehicleByCondition } from '@domain/interfaces/vehicle'

export const FindVehicleByConditionQuery = (
  parameter: FindVehicleByCondition
) => {
  return {
    where: {
      brand: parameter.brand,
      model: parameter.model,
      fuel: parameter.fuel as Fuel,
      year: parameter.year,
      color: parameter.color,
      price: parameter.price,
      sale_id: parameter.sale_id,
      status: parameter.status as VehicleStatus
    }
  }
}
