import { PaymentMethod, PaymentStatus } from '@domain/enums'
import { IdentifierMock, IdentifierWithKeyMock } from '@mocks/common'
import { CreatedSaleMock } from '@mocks/sale'

export const FindPaymentByIdMock = IdentifierWithKeyMock

export const FindedPaymentWithSaleMock = {
  id: IdentifierMock,
  sale: {
    ...CreatedSaleMock
  },
  status: PaymentStatus.Approved,
  method: PaymentMethod.Credit
}
