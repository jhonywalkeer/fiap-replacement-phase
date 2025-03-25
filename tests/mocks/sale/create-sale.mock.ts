import { IdentifierMock } from '@mocks/common'

export const InputSaleMock = {
  vehicle_id: IdentifierMock,
  buyer_id: IdentifierMock,
  sale_date: new Date('2025-03-15T01:00:00.000Z'),
  payment_id: IdentifierMock
}

export const CreateSaleMock = InputSaleMock

export const CreatedSaleMock = {
  id: IdentifierMock,
  ...CreateSaleMock
}
