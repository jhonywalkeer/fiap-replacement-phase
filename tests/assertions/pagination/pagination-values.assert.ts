import { PaginateDTO } from '@application/dtos/common'
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

export const PaginationValuesAssert = [
  {
    description: 'default values if no value is provided',
    input: new PaginateDTO(),
    expected: {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      sort: undefined,
      order: Ordenation.ASC,
      filter: undefined,
      value: undefined
    }
  },
  {
    description: 'provided values when they are valid',
    input: new PaginateDTO(
      PageMock,
      LimitMock,
      SortMock,
      OrderMock,
      FilterMock,
      ValueMock
    ),
    expected: {
      page: PageMock,
      limit: LimitMock,
      sort: SortMock,
      order: OrderMock,
      filter: FilterMock,
      value: ValueMock
    }
  },
  {
    description: 'default values if no page is informed',
    input: new PaginateDTO(
      undefined,
      LimitMock,
      undefined,
      OrderMock,
      FilterMock,
      ValueMock
    ),
    expected: {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      sort: undefined,
      order: Ordenation.ASC,
      filter: FilterMock,
      value: ValueMock
    }
  },
  {
    description: 'default values if no limit is informed',
    input: new PaginateDTO(
      PageMock,
      undefined,
      undefined,
      OrderMock,
      FilterMock,
      ValueMock
    ),
    expected: {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      sort: undefined,
      order: Ordenation.ASC,
      filter: FilterMock,
      value: ValueMock
    }
  }
]
