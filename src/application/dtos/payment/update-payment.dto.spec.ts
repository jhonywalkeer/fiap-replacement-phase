import { UpdatePaymentDTO } from '@application/dtos/payment'
import { InputUpdatePaymentMock, UpdatePaymentMock } from '@mocks/payment'

describe(`[DTO's] Update Payment DTO`, () => {
  it('should call with the correct params', () => {
    const input: UpdatePaymentDTO = new UpdatePaymentDTO(
      InputUpdatePaymentMock.payment_id,
      InputUpdatePaymentMock.status,
      InputUpdatePaymentMock.reason
    )

    expect(input).toBeInstanceOf(UpdatePaymentDTO)
    expect(input).toEqual({
      payment_id: UpdatePaymentMock.payment_id,
      status: UpdatePaymentMock.status,
      reason: UpdatePaymentMock.reason
    })
  })
})
