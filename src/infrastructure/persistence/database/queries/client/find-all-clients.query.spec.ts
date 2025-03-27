import { Pagination } from '@common/constants'
import { FindAllClientsQuery } from './find-all-clients.query'
import { PaginationAndFilter } from '@common/interfaces'
import { Ordenation } from '@common/enums'

describe('[Queries] Find All Clients Query', () => {
  it('should return default sorting by created at when sort is not provided', () => {
    const queryParameters: PaginationAndFilter = {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      order: Ordenation.ASC
    }
    const result = FindAllClientsQuery(queryParameters)
    expect(result.condition.orderBy).toEqual({ created_at: 'asc' })
  })

  it('should return sorting by provided sort parameter', () => {
    const queryParameters: PaginationAndFilter = {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      sort: 'name',
      order: Ordenation.DESC
    }
    const result = FindAllClientsQuery(queryParameters)
    expect(result.condition.orderBy).toEqual({ name: 'desc' })
  })

  it('should apply pagination filter correctly', () => {
    const queryParameters: PaginationAndFilter = {
      page: 2,
      limit: 5,
      sort: 'name',
      order: 'asc'
    }
    const result = FindAllClientsQuery(queryParameters)
    expect(result.condition).toHaveProperty('skip', 5)
    expect(result.condition).toHaveProperty('take', 5)
  })

  it('should handle missing order parameter', () => {
    const queryParameters: PaginationAndFilter = {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      sort: 'name'
    }
    const result = FindAllClientsQuery(queryParameters)
    expect(result.condition.orderBy).toEqual({ name: undefined })
  })
})
