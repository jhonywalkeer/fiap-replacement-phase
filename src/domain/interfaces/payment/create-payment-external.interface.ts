import { PaymentMethod } from '@domain/enums'

type Payer = {
  mail: string
  security_social_number: string
}

export type CardPayment = {
  type: string
  flag: string
  number: string
  cvv: string
  expiration_year: string
  expiration_month: string
}

export type CreatePaymentExternal = {
  payer: Payer
  description: string
  amount: number
  method: PaymentMethod
  card: CardPayment
}
