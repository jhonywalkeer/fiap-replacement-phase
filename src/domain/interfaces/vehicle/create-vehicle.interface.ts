import { Vehicle } from '@domain/interfaces/vehicle'

export type CreateVehicle = Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>
