import { PaginationAndFilter } from '@common/interfaces'
import { ClientEntity } from '@domain/entities'

export interface FindAllClientsUseCase {
  execute(
    queryParameters: PaginationAndFilter
  ): Promise<[ClientEntity[], number]>
}
