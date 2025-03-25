import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types'
import { SaleEntity } from '@domain/entities'

export interface FindSaleByIdRepository
  extends Omit<Repositories<SaleEntity | null>, FindByIdRepository> {}
