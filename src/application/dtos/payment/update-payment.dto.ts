import { IncorrectType } from '@common/enums'
import { Field } from '@domain/enums'
import { IsProvided, IsString, IsUUID } from '@presentation/validators'

export class UpdatePaymentDTO {
  payment_id: string
  status: string
  reason: string

  constructor(payment_id: string, status: string, reason: string) {
    IsProvided(IncorrectType.Field, payment_id, Field.PaymentIdentification)
    IsProvided(IncorrectType.Field, status, Field.PaymentStatus)
    IsProvided(IncorrectType.Field, reason, Field.PaymentReason)

    this.payment_id = IsUUID(payment_id, Field.PaymentIdentification)
    this.status = IsString(status, Field.PaymentStatus)
    this.reason = IsString(reason, Field.PaymentReason)
  }
}
