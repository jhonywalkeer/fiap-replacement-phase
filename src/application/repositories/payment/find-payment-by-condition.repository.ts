import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'

export interface FindPaymentByConditionRepository
  extends Omit<Repositories<any | null>, FindByConditionRepository> {}
