import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { SaleEntity } from '@domain/entities'

export interface FindSaleByConditionRepository
  extends Omit<Repositories<SaleEntity | null>, FindByConditionRepository> {}
