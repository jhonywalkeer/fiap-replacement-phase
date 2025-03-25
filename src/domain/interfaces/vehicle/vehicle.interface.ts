import { Fuel, VehicleStatus } from '@domain/enums'

export type Vehicle = {
  id: string
  brand: string
  model: string
  fuel: Fuel
  year: number
  color: string
  price: number
  created_at: Date
  updated_at: Date
  sale_id: string
  status: VehicleStatus
}
