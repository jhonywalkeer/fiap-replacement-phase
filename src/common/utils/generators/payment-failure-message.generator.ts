import { PaymentFailureMessages } from '@common/constants'

export const PaymentFailureMessageGenerator = (): string => {
  const randomIndex = Math.floor(Math.random() * PaymentFailureMessages.length)

  return PaymentFailureMessages[randomIndex]
}
