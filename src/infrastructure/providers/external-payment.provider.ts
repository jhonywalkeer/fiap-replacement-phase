import { PaymentFailureMessageGenerator } from '@common/utils/generators'
import { IsEvenNumberIdentify } from '@common/utils/identifiers'
import { PaymentMethod, PaymentStatus } from '@domain/enums'
import { CreatePaymentExternal } from '@domain/interfaces'

export class ExternalPaymentProvider {
  constructor() {}

  public async payment(input: CreatePaymentExternal): Promise<any> {
    const isCard =
      input.method === PaymentMethod.Credit ||
      input.method === PaymentMethod.Debit
    const isPix = input.method === PaymentMethod.Pix
    const cardNumber = isCard ? `${input.card.number}`.slice(-1) : 0
    const isEven: boolean = isCard ? IsEvenNumberIdentify(+cardNumber) : false
    const status: PaymentStatus =
      isEven || isPix ? PaymentStatus.Approved : PaymentStatus.Canceled
    const reason: string | null =
      isEven || isPix ? null : PaymentFailureMessageGenerator()

    const data = {
      status,
      reason
    }

    return data
  }
}
