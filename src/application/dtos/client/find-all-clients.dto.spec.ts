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
import { FindAllClientsDTO } from '@application/dtos/client'

describe(`[DTO's] Find All Clients DTO`, () => {
  it('should return the values ​​with all parameters informed', () => {
    const input: FindAllClientsDTO = new FindAllClientsDTO(
      PageMock,
      LimitMock,
      SortMock,
      OrderMock,
      FilterMock,
      ValueMock
    )

    expect(input).toBeInstanceOf(FindAllClientsDTO)
    expect(input.page).toBe(PageMock)
    expect(input.limit).toBe(LimitMock)
    expect(input.sort).toBe(SortMock)
    expect(input.order).toBe(OrderMock)
    expect(input.filter).toBe(FilterMock)
    expect(input.value).toBe(ValueMock)
  })

  it('should return the default values if no value is provided', () => {
    const input: FindAllClientsDTO = new FindAllClientsDTO()

    expect(input).toBeInstanceOf(FindAllClientsDTO)
    expect(input.page).toBe(Pagination.Default.Page)
    expect(input.limit).toBe(Pagination.Default.Limit)
    expect(input.sort).toBeUndefined()
    expect(input.order).toBe(Ordenation.ASC)
    expect(input.filter).toBeUndefined()
    expect(input.value).toBeUndefined()
  })
})
