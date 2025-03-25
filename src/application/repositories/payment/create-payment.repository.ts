import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'

export interface CreatePaymentRepository
  extends Omit<Repositories<any>, CreateRepository> {}
