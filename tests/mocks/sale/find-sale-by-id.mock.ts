import { IdentifierMock, IdentifierWithKeyMock } from '@mocks/common'
import { InputSaleMock } from './create-sale.mock'

export const FindSaleByIdMock = IdentifierWithKeyMock

export const FindedSaleByIdMock = {
  id: IdentifierMock,
  ...InputSaleMock
}
