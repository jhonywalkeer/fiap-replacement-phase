import { Fuel, VehicleStatus } from '@domain/enums'
import { UpdateVehicleQuery } from './update-vehicle.query'
import { UpdateVehicle } from '@domain/interfaces/vehicle'
import { IdentifierMock } from '@mocks/common'

describe('[Queries] Update Vehicle Query', () => {
  it('should return the correct query object when all fields are provided', () => {
    const payload: UpdateVehicle = {
      id: IdentifierMock,
      brand: 'Toyota',
      model: 'Corolla',
      fuel: Fuel.Gasoline,
      year: 2020,
      price: 20000,
      sale_id: IdentifierMock,
      status: VehicleStatus.Available
    }

    const result = UpdateVehicleQuery(payload)

    expect(result).toEqual({
      where: { id: IdentifierMock },
      data: {
        brand: 'Toyota',
        model: 'Corolla',
        fuel: Fuel.Gasoline,
        year: 2020,
        price: 20000,
        sale_id: IdentifierMock,
        status: VehicleStatus.Available
      }
    })
  })

  it('should handle missing optional fields gracefully', () => {
    const payload: UpdateVehicle = {
      id: IdentifierMock,
      brand: 'Toyota',
      model: 'Corolla',
      fuel: Fuel.Gasoline,
      year: 2020,
      price: 20000,
      sale_id: null as any,
      status: VehicleStatus.Available
    }

    const result = UpdateVehicleQuery(payload)

    expect(result).toEqual({
      where: { id: IdentifierMock },
      data: {
        brand: 'Toyota',
        model: 'Corolla',
        fuel: Fuel.Gasoline,
        year: 2020,
        price: 20000,
        sale_id: null,
        status: VehicleStatus.Available
      }
    })
  })
})
