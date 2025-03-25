import { PaginationAndFilter } from '@common/interfaces'
import { PaginationFilter } from '@common/utils/filters'

export const FindAllVehiclesQuery = (queryParameters: PaginationAndFilter) => {
  const sorting: string = queryParameters.sort || 'price'
  const filter: string = queryParameters.filter || 'brand'
  const value: string = queryParameters.value || ''
  const whereClause = {
    where: {
      [filter]: {
        contains: value
      }
    }
  }

  const condition = {
    ...PaginationFilter(queryParameters.page, queryParameters.limit),
    orderBy: {
      [sorting]: queryParameters.order
    },
    ...whereClause
  }
  const count = {
    ...whereClause
  }

  return {
    condition,
    count
  }
}
