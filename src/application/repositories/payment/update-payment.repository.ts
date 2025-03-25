import { Repositories } from '@application/repositories/common'
import { UpdateRepository } from '@common/types'

export interface UpdatePaymentRepository
  extends Omit<Repositories<any | null>, UpdateRepository> {}
