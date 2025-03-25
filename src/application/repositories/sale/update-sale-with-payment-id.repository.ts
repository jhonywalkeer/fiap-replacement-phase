import { Repositories } from '@application/repositories/common'
import { UpdateSaleWithPaymentIdRepository } from '@common/types'
import { SaleEntity } from '@domain/entities'

export interface UpdateSaleWithPaymentRepository
  extends Omit<
    Repositories<SaleEntity | null>,
    UpdateSaleWithPaymentIdRepository
  > {}
