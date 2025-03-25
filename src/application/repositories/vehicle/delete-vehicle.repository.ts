import { Repositories } from '@application/repositories/common'
import { DeleteRepository } from '@common/types'

export interface DeleteVehicleRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
