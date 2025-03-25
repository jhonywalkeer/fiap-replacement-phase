import { PaginationAndFilter } from '@common/interfaces'
import { PaginationFilter } from '@common/utils/filters'

export const FindAllClientsQuery = (queryParameters: PaginationAndFilter) => {
  const sorting: string = queryParameters.sort || 'created_at'
  const filter: string = queryParameters.filter || 'name'
  const value: string = queryParameters.value || ''

  const condition = {
    ...PaginationFilter(queryParameters.page, queryParameters.limit),
    orderBy: {
      [sorting]: queryParameters.order
    },
    where: {
      [filter]: {
        contains: value
      }
    }
  }

  const count = {
    where: {
      [filter]: {
        contains: value
      }
    }
  }

  return {
    condition,
    count
  }
}
