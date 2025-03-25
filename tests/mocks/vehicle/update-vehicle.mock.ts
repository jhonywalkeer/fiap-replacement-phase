import { IdentifierMock } from '@mocks/common'
import { InputVehicleMock } from './create-vehicle.mock'

export const UpdateVehicleMock = {
  id: IdentifierMock,
  ...InputVehicleMock
}

export const UpdatedVehicleMock = {
  id: IdentifierMock,
  ...InputVehicleMock,
  created_at: new Date(),
  updated_at: new Date()
}
