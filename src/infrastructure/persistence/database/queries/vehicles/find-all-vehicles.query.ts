import { PaginationAndFilter } from '@common/interfaces'
import { PaginationFilter } from '@common/utils/filters'
import { VehicleStatus } from '@domain/enums'

export const FindAllVehiclesQuery = (queryParameters: PaginationAndFilter) => {
  const sorting: string = queryParameters.sort || 'price'
  const filter: string = queryParameters.filter || 'status'
  const value: string = queryParameters.value || VehicleStatus.Available

  const whereClause = {
    where: {
      [filter]: {
        equals: value
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
