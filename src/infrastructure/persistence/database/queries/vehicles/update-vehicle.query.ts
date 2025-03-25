import { UpdateVehicle } from '@domain/interfaces/vehicle'

export const UpdateVehicleQuery = (payload: UpdateVehicle) => {
  return {
    where: { id: payload.id },
    data: {
      brand: payload.brand,
      model: payload.model,
      fuel: payload.fuel,
      year: payload.year,
      price: payload.price,
      sale_id: payload.sale_id,
      status: payload.status
    }
  }
}
