import { Fuel, VehicleStatus } from '@domain/enums'
import { CreateVehiclesQuery } from './create-vehicles.query'
import { CreateVehicle } from '@domain/interfaces/vehicle'
import { IdentifierMock } from '@mocks/common'

describe('[Queries] Create Vehicles Query', () => {
  it('should return the correct query object when valid payload is provided', () => {
    const payload: CreateVehicle = {
      brand: 'Toyota',
      model: 'Corolla',
      fuel: Fuel.Gasoline,
      year: 2022,
      color: 'White',
      price: 20000,
      sale_id: IdentifierMock,
      status: VehicleStatus.Available
    }

    const result = CreateVehiclesQuery(payload)

    expect(result).toEqual({
      data: {
        brand: 'Toyota',
        model: 'Corolla',
        fuel: Fuel.Gasoline,
        year: 2022,
        color: 'White',
        price: 20000,
        sale_id: IdentifierMock,
        status: VehicleStatus.Available
      }
    })
  })

  it('should handle missing or undefined fields gracefully', () => {
    const payload: Partial<CreateVehicle> = {
      brand: 'Honda',
      model: 'Civic'
    } as CreateVehicle

    const result = CreateVehiclesQuery(payload as CreateVehicle)

    expect(result).toEqual({
      data: {
        brand: 'Honda',
        model: 'Civic',
        fuel: undefined,
        year: undefined,
        color: undefined,
        price: undefined,
        sale_id: undefined,
        status: undefined
      }
    })
  })
})
