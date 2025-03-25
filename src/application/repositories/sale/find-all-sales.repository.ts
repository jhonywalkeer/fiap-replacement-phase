import { Repositories } from '@application/repositories/common'
import { FindAllRepository } from '@common/types'
import { SaleEntity } from '@domain/entities'

export interface FindAllSalesRepository
  extends Omit<Repositories<[SaleEntity, number] | null>, FindAllRepository> {}
