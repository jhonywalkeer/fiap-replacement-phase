import { Sale } from '@domain/interfaces/sale'

export class SaleEntity {
  readonly id: string
  readonly vehicle_id: string
  readonly buyer_id: string
  readonly sale_date: Date
  readonly payment_id: string | null

  private constructor(props: Sale) {
    this.id = props.id
    this.vehicle_id = props.vehicle_id
    this.buyer_id = props.buyer_id
    this.sale_date = props.sale_date
    this.payment_id = props.payment_id
  }

  static create(props: Sale): SaleEntity {
    return new SaleEntity(props)
  }
}
