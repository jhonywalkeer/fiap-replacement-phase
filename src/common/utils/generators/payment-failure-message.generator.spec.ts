import { PaymentFailureMessages } from '@common/constants'
import { PaymentFailureMessageGenerator } from './payment-failure-message.generator'

describe('[Generators] Payment Failure Message Generator', () => {
  it('should return a string from PaymentFailureMessages', () => {
    const message = PaymentFailureMessageGenerator()
    expect(PaymentFailureMessages).toContain(message)
  })

  it('should return a different message on subsequent calls', () => {
    const first_message = PaymentFailureMessageGenerator()
    const second_message = PaymentFailureMessageGenerator()

    expect(first_message).not.toEqual(second_message)
  })
})
