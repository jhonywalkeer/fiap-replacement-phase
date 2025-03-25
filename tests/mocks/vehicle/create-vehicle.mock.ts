import { IdentifierMock } from '@mocks/common'

export const InputVehicleMock = {
  brand: 'Fiat',
  model: 'Uno',
  fuel: 'Flex',
  year: 2020,
  color: 'Black',
  price: 21500.59,
  status: 'Available'
}

export const CreateVehicleMock = InputVehicleMock

export const CreatedVehicleMock = {
  id: IdentifierMock,
  ...CreateVehicleMock,
  created_at: new Date(),
  updated_at: new Date()
}
