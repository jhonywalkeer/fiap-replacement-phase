import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types'
import { VehicleEntity } from '@domain/entities'

export interface FindVehicleByIdRepository
  extends Omit<Repositories<VehicleEntity | null>, FindByIdRepository> {}
