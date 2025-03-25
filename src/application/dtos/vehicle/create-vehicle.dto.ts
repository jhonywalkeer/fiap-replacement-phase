import { IncorrectType } from '@common/enums'
import { CapitalizeFirstLetterFormat } from '@common/utils/formatters'
import { Field, Fuel, VehicleStatus } from '@domain/enums'
import { IsDecimal, IsEnum, IsInt, IsProvided } from '@presentation/validators'
import { IsString } from '@presentation/validators'

export class CreateVehicleDTO {
  brand: string
  model: string
  fuel?: string
  year: number
  color: string
  price: number
  status?: string

  constructor(
    brand: string,
    model: string,
    fuel: string,
    year: number,
    color: string,
    price: number,
    status: string
  ) {
    IsProvided(IncorrectType.Field, brand, Field.Brand)
    IsProvided(IncorrectType.Field, model, Field.Model)
    IsProvided(IncorrectType.Field, year, Field.Year)
    IsProvided(IncorrectType.Field, color, Field.Color)
    IsProvided(IncorrectType.Field, price, Field.Price)

    this.brand = IsString(brand, Field.Brand)
    this.model = IsString(model, Field.Model)
    this.fuel = fuel
      ? IsEnum(CapitalizeFirstLetterFormat(fuel), Fuel, Field.Fuel)
      : Fuel.Gasoline
    this.year = IsInt(year, Field.Year)
    this.color = IsString(color, Field.Color)
    this.price = IsDecimal(price, Field.Price)
    this.status = status
      ? IsEnum(CapitalizeFirstLetterFormat(status), VehicleStatus, Field.Status)
      : VehicleStatus.Available
  }
}
