import { CreateVehicle } from '@domain/interfaces/vehicle'

export const CreateVehiclesQuery = (payload: CreateVehicle) => {
  return {
    data: {
      brand: payload.brand,
      model: payload.model,
      fuel: payload.fuel,
      year: payload.year,
      color: payload.color,
      price: payload.price,
      sale_id: payload.sale_id,
      status: payload.status
    }
  }
}
