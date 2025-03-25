import { IncorrectType } from '@common/enums'
import { Field } from '@domain/enums'
import { IsDate, IsProvided, IsUUID } from '@presentation/validators'

export class CreateSaleDTO {
  vehicle_id: string
  buyer_id: string
  sale_date: Date
  payment_id?: string

  constructor(
    vehicle_id: string,
    buyer_id: string,
    sale_date: Date,
    payment_id?: string
  ) {
    IsProvided(IncorrectType.Field, vehicle_id, Field.VehicleIdentification)
    IsProvided(IncorrectType.Field, buyer_id, Field.BuyerIdentification)
    IsProvided(IncorrectType.Field, sale_date, Field.SaleDate)

    this.vehicle_id = IsUUID(vehicle_id, Field.VehicleIdentification)
    this.buyer_id = IsUUID(buyer_id, Field.BuyerIdentification)
    this.sale_date = IsDate(sale_date, Field.SaleDate)
    this.payment_id = payment_id
      ? IsUUID(payment_id, Field.PaymentIdentification)
      : undefined
  }
}
