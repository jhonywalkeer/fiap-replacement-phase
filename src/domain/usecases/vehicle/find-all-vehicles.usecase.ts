import { PaginationAndFilter } from '@common/interfaces'
import { VehicleEntity } from '@domain/entities'

export interface FindAllVehiclesUseCase {
  execute(
    queryParameters: PaginationAndFilter
  ): Promise<[VehicleEntity, number]>
}
