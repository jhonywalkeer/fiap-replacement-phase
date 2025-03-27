import { FindAllVehiclesDTO } from '@application/dtos/vehicle'
import { Pagination } from '@common/constants'
import { Ordenation } from '@common/enums'
import {
  PageMock,
  LimitMock,
  SortMock,
  OrderMock,
  FilterMock,
  ValueMock
} from '@mocks/pagination'

describe(`[DTO's] Find All Vehicle DTO`, () => {
  it('should return the values ​​with all parameters informed', () => {
    const input: FindAllVehiclesDTO = new FindAllVehiclesDTO(
      PageMock,
      LimitMock,
      SortMock,
      OrderMock,
      FilterMock,
      ValueMock
    )

    expect(input).toBeInstanceOf(FindAllVehiclesDTO)
    expect(input.page).toBe(PageMock)
    expect(input.limit).toBe(LimitMock)
    expect(input.sort).toBe(SortMock)
    expect(input.order).toBe(OrderMock)
    expect(input.filter).toBe(FilterMock)
    expect(input.value).toBe(ValueMock)
  })

  it('should return the default values if no value is provided', () => {
    const input: FindAllVehiclesDTO = new FindAllVehiclesDTO()

    expect(input).toBeInstanceOf(FindAllVehiclesDTO)
    expect(input.page).toBe(Pagination.Default.Page)
    expect(input.limit).toBe(Pagination.Default.Limit)
    expect(input.sort).toBeUndefined()
    expect(input.order).toBe(Ordenation.ASC)
    expect(input.filter).toBeUndefined()
    expect(input.value).toBeUndefined()
  })
})
