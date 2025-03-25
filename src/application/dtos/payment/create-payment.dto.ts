import { IncorrectType } from '@common/enums'
import { CapitalizeFirstLetterFormat } from '@common/utils/formatters'
import { Field, PaymentMethod } from '@domain/enums'
import { IsDecimal, IsEnum, IsProvided, IsUUID } from '@presentation/validators'
import { CardInfoPaymentDTO } from './card-info-payment.dto'

export class CreatePaymentDTO {
  sale_id: string
  amount: number
  payment_method: string
  card?: CardInfoPaymentDTO

  constructor(
    sale_id: string,
    amount: number,
    payment_method: string,
    card?: CardInfoPaymentDTO
  ) {
    IsProvided(Field.SaleIdentification, sale_id, IncorrectType.Field)
    IsProvided(Field.Price, amount, IncorrectType.Field)
    IsProvided(Field.PaymentMethod, payment_method, IncorrectType.Field)

    this.sale_id = IsUUID(sale_id, Field.SaleIdentification)
    this.amount = IsDecimal(amount, Field.Price)
    this.payment_method = IsEnum(
      CapitalizeFirstLetterFormat(payment_method),
      PaymentMethod,
      Field.PaymentMethod
    )

    this.card =
      payment_method === PaymentMethod.Credit ||
      payment_method === PaymentMethod.Debit
        ? (IsProvided(
            Field.Card,
            card,
            IncorrectType.Field
          ) as CardInfoPaymentDTO)
        : undefined
  }
}
