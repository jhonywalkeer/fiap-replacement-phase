import { Field } from '@domain/enums'
import { IsInt, IsString } from '@presentation/validators'

export class CardInfoPaymentDTO {
  type: string
  flag: string
  number: number
  cvv: number
  expiration_month: number
  expiration_year: number

  constructor(
    type: string,
    flag: string,
    number: number,
    cvv: number,
    expiration_month: number,
    expiration_year: number
  ) {
    this.type = IsString(type, Field.CardType)
    this.flag = IsString(flag, Field.CardFlag)
    this.number = IsInt(number, Field.CardNumber)
    this.cvv = IsInt(cvv, Field.CardCvv)
    this.expiration_month = IsInt(expiration_month, Field.CardExpirationMonth)
    this.expiration_year = IsInt(expiration_year, Field.CardExpirationYear)
  }
}
