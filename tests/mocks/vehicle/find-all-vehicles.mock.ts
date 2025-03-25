import { FindedVehicleByIdMock } from './find-vehicle-by-id.mock'

export const FindAllVehiclesMock = [
  [
    FindedVehicleByIdMock,
    {
      id: FindedVehicleByIdMock.id,
      brand: 'Fiat',
      model: 'Uno',
      fuel: 'Flex',
      year: 2010,
      color: 'Red',
      price: 20000,
      status: 'Available',
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  2
]
