import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { VehicleEntity } from '@domain/entities'

export interface CreateVehicleRepository
  extends Omit<Repositories<VehicleEntity>, CreateRepository> {}
