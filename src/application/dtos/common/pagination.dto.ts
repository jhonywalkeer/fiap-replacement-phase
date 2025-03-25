import { Pagination } from '@common/constants'
import { IncorrectType, Ordenation } from '@common/enums'
import { Field } from '@domain/enums'
import { IsEnum, IsString } from '@presentation/validators'

export class PaginateDTO {
  page: number
  limit: number
  sort?: string
  order?: string
  filter?: string
  value?: string

  constructor(
    page: number = Pagination.Default.Page,
    limit: number = Pagination.Default.Limit,
    sort?: string,
    order?: string,
    filter?: string,
    value?: string
  ) {
    this.page = Number(page)
    this.limit = Number(limit)
    this.sort = sort ? IsString(sort, Field.Sort, IncorrectType.Param) : sort
    this.order = order
      ? IsEnum(order, Ordenation, Field.Order, IncorrectType.Param)
      : Ordenation.ASC
    this.filter = filter
      ? IsString(filter, Field.Filter, IncorrectType.Param)
      : filter
    this.value = value
      ? IsString(value, Field.Value, IncorrectType.Param)
      : value
  }
}
