import { Payment } from '@domain/interfaces'
import { PaymentMethod } from '@domain/enums'
import { BadRequestError } from '@common/errors'
import { ErrorMessage } from '@common/enums'

export class PaymentEntity {
  readonly sale_id: string
  readonly amount: number
  readonly method: PaymentMethod

  private constructor(payment: Payment) {
    this.sale_id = payment.sale_id
    this.amount = payment.amount
    this.method = payment.method
    this.validate()
  }

  static create(payment: Payment): PaymentEntity {
    return new PaymentEntity(payment)
  }

  private validate(): void {
    if (this.amount <= 0) {
      throw new BadRequestError(ErrorMessage.AmountValue)
    }
  }
}
