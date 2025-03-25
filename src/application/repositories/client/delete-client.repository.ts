import { Repositories } from '@application/repositories/common'
import { DeleteRepository } from '@common/types'

export interface DeleteClientRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
