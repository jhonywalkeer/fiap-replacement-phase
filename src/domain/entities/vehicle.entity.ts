import { Fuel, VehicleStatus } from '@domain/enums'
import { Vehicle } from '@domain/interfaces/vehicle'
import { BaseEntity } from '@domain/entities'
import { Decimal } from '@common/utils/formatters'

export class VehicleEntity extends BaseEntity {
  readonly brand: string
  readonly model: string
  readonly fuel: Fuel
  readonly year: number
  readonly color: string
  readonly price: Decimal
  readonly sale_id: string | null
  readonly status: VehicleStatus

  private constructor(props: Vehicle) {
    super(props.id, props.created_at, props.updated_at)
    this.brand = props.brand
    this.model = props.model
    this.fuel = props.fuel
    this.year = props.year
    this.color = props.color
    this.price = new Decimal(props.price)
    this.sale_id = props.sale_id
    this.status = props.status
  }

  static create(props: Vehicle): VehicleEntity {
    return new VehicleEntity(props)
  }
}
