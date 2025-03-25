import { PaginationAndFilter } from '@common/interfaces'
import { PaginationFilter } from '@common/utils/filters'

export const FindAllSalesQuery = (queryParameters: PaginationAndFilter) => {
  const sorting: string = queryParameters.sort || 'sale_date'

  const condition = {
    ...PaginationFilter(queryParameters.page, queryParameters.limit),
    orderBy: {
      [sorting]: queryParameters.order
    }
  }

  return {
    condition
  }
}
