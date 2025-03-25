import { Repositories } from '@application/repositories/common'
import { UpdateVehicleWithStatusRepository } from '@common/types'
import { VehicleEntity } from '@domain/entities'

export interface UpdateVehicleStatusRepository
  extends Omit<
    Repositories<VehicleEntity | null>,
    UpdateVehicleWithStatusRepository
  > {}
