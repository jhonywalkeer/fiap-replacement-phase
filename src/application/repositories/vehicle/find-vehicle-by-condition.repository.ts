import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { VehicleEntity } from '@domain/entities'

export interface FindVehicleByConditionRepository
  extends Omit<Repositories<VehicleEntity | null>, FindByConditionRepository> {}
