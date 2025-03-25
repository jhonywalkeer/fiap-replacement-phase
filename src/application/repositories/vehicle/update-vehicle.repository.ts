import { Repositories } from '@application/repositories/common'
import { UpdateRepository } from '@common/types'
import { VehicleEntity } from '@domain/entities'

export interface UpdateVehicleRepository
  extends Omit<Repositories<VehicleEntity | null>, UpdateRepository> {}
