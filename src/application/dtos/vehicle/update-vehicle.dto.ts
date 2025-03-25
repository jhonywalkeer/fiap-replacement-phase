import { IdentifierDTO } from '@application/dtos/common'
import { CapitalizeFirstLetterFormat } from '@common/utils/formatters'
import { Field, Fuel, VehicleStatus } from '@domain/enums'
import { IsDecimal, IsEnum, IsInt, IsString } from '@presentation/validators'

export class UpdateVehicleDTO extends IdentifierDTO {
  brand?: string
  model?: string
  fuel?: string
  year?: number
  color?: string
  price?: number
  status?: string

  constructor(
    id: string,
    brand?: string,
    model?: string,
    fuel?: string,
    year?: number,
    color?: string,
    price?: number,
    status?: string
  ) {
    super(id)

    this.brand = brand ? IsString(brand, Field.Brand) : undefined
    this.model = model ? IsString(model, Field.Model) : undefined
    this.fuel = fuel
      ? IsEnum(CapitalizeFirstLetterFormat(fuel), Fuel, Field.Fuel)
      : undefined
    this.year = year ? IsInt(year, Field.Year) : undefined
    this.color = color ? IsString(color, Field.Color) : undefined
    this.price = price ? IsDecimal(price, Field.Price) : undefined
    this.status = status
      ? IsEnum(CapitalizeFirstLetterFormat(status), VehicleStatus, Field.Status)
      : undefined
  }
}
