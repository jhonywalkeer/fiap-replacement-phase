import { PaginationAndFilter } from '@common/interfaces'
import { SaleEntity } from '@domain/entities'

export interface FindAllSalesUseCase {
  execute(queryParameters: PaginationAndFilter): Promise<[SaleEntity, number]>
}
