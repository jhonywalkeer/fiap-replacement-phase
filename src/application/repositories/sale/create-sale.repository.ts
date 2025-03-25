import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { SaleEntity } from '@domain/entities'

export interface CreateSaleRepository
  extends Omit<Repositories<SaleEntity>, CreateRepository> {}
