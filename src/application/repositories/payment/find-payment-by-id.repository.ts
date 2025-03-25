import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types'
import { PaymentWithSaleEntity } from '@domain/entities'

export interface FindPaymentByIdRepository
  extends Omit<
    Repositories<PaymentWithSaleEntity | null>,
    FindByIdRepository
  > {}
