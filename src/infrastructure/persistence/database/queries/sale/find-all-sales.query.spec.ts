import { Pagination } from '@common/constants'
import { FindAllSalesQuery } from './find-all-sales.query'
import { PaginationAndFilter } from '@common/interfaces'
import { Ordenation } from '@common/enums'

describe('[Queries] Find All Sales Query', () => {
  it('should return the correct condition with default sorting', () => {
    const queryParameters: PaginationAndFilter = {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      sort: undefined,
      order: Ordenation.ASC
    }

    const result = FindAllSalesQuery(queryParameters)

    expect(result).toEqual({
      condition: {
        skip: 0,
        take: Pagination.Default.Limit,
        orderBy: {
          sale_date: Ordenation.ASC
        }
      }
    })
  })

  it('should return the correct condition with custom sorting', () => {
    const queryParameters: PaginationAndFilter = {
      page: 2,
      limit: 5,
      sort: 'customer_name',
      order: Ordenation.DESC
    }

    const result = FindAllSalesQuery(queryParameters)

    expect(result).toEqual({
      condition: {
        skip: 5,
        take: 5,
        orderBy: {
          customer_name: Ordenation.DESC
        }
      }
    })
  })

  it('should handle missing page and limit gracefully', () => {
    const queryParameters: PaginationAndFilter = {
      page: undefined as any,
      limit: undefined as any,
      sort: 'sale_date',
      order: Ordenation.ASC
    }

    const result = FindAllSalesQuery(queryParameters)

    expect(result).toEqual({
      condition: {
        skip: 0,
        take: Pagination.Default.Limit,
        orderBy: {
          sale_date: Ordenation.ASC
        }
      }
    })
  })
})
