import { FindVehicleByConditionQuery } from './find-vehicle-by-condition.query'
import { Fuel, VehicleStatus } from '@domain/enums'
import { FindVehicleByCondition } from '@domain/interfaces/vehicle'
import { IdentifierMock } from '@mocks/common'

describe('[Queries] Find Vehicle By Condition Query', () => {
  it('should return the correct query object when all parameters are provided', () => {
    const parameter: FindVehicleByCondition = {
      brand: 'Toyota',
      model: 'Corolla',
      fuel: Fuel.Gasoline,
      year: 2020,
      color: 'Red',
      price: 20000,
      sale_id: IdentifierMock,
      status: VehicleStatus.Available
    }

    const result = FindVehicleByConditionQuery(parameter)

    expect(result).toEqual({
      where: {
        brand: 'Toyota',
        model: 'Corolla',
        fuel: Fuel.Gasoline,
        year: 2020,
        color: 'Red',
        price: 20000,
        sale_id: IdentifierMock,
        status: VehicleStatus.Available
      }
    })
  })

  it('should handle missing optional parameters gracefully', () => {
    const parameter: FindVehicleByCondition = {
      brand: 'Honda',
      model: 'Civic',
      fuel: Fuel.Diesel,
      year: 2018,
      color: undefined as any,
      price: undefined as any,
      sale_id: undefined as any,
      status: VehicleStatus.Sold as any
    }

    const result = FindVehicleByConditionQuery(parameter)

    expect(result).toEqual({
      where: {
        brand: 'Honda',
        model: 'Civic',
        fuel: Fuel.Diesel,
        year: 2018,
        color: undefined,
        price: undefined,
        sale_id: undefined,
        status: VehicleStatus.Sold
      }
    })
  })

  it('should handle edge cases with null or empty values', () => {
    const parameter: FindVehicleByCondition = {
      brand: '',
      model: null as any,
      fuel: null as any,
      year: null as any,
      color: '',
      price: null as any,
      sale_id: '',
      status: null as any
    }

    const result = FindVehicleByConditionQuery(parameter)

    expect(result).toEqual({
      where: {
        brand: '',
        model: null,
        fuel: null,
        year: null,
        color: '',
        price: null,
        sale_id: '',
        status: null
      }
    })
  })
})
