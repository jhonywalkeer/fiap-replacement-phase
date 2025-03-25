import { IdentifierMock } from '@mocks/common'
import { FindedSaleByIdMock } from './find-sale-by-id.mock'

export const FindAllSalesMock = [
  [
    FindedSaleByIdMock,
    {
      vehicle_id: IdentifierMock,
      buyer_id: IdentifierMock,
      sale_date: new Date('2025-03-15T01:00:00.000Z'),
      payment_id: IdentifierMock
    }
  ],
  2
]
