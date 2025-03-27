import { VehicleEntity } from './vehicle.entity'
import { Decimal } from '@common/utils/formatters'
import { CreatedVehicleMock } from '@mocks/vehicle'

describe('[Entities] Vehicle Entity', () => {
  it('should create a VehicleEntity instance using the constructor', () => {
    const vehicle = CreatedVehicleMock as any

    expect(vehicle.brand).toBe(CreatedVehicleMock.brand)
    expect(vehicle.model).toBe(CreatedVehicleMock.model)
    expect(vehicle.fuel).toBe(CreatedVehicleMock.fuel)
    expect(vehicle.year).toBe(CreatedVehicleMock.year)
    expect(vehicle.color).toBe(CreatedVehicleMock.color)
    expect(vehicle.price).toEqual(CreatedVehicleMock.price)
    expect(vehicle.sale_id).toBe(undefined)
    expect(vehicle.status).toBe(CreatedVehicleMock.status)
  })

  it('should create a VehicleEntity instance using the static create method', () => {
    const vehicle = VehicleEntity.create(CreatedVehicleMock as any)

    expect(vehicle).toBeInstanceOf(VehicleEntity)
    expect(vehicle.brand).toBe(CreatedVehicleMock.brand)
    expect(vehicle.model).toBe(CreatedVehicleMock.model)
    expect(vehicle.fuel).toBe(CreatedVehicleMock.fuel)
    expect(vehicle.year).toBe(CreatedVehicleMock.year)
    expect(vehicle.color).toBe(CreatedVehicleMock.color)
    expect(vehicle.price).toEqual(new Decimal(CreatedVehicleMock.price))
    expect(vehicle.sale_id).toBe(undefined)
    expect(vehicle.status).toBe(CreatedVehicleMock.status)
  })
})
