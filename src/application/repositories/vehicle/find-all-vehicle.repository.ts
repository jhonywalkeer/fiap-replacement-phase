import { Repositories } from '@application/repositories/common'
import { FindAllRepository } from '@common/types'
import { VehicleEntity } from '@domain/entities'

export interface FindAllVehiclesRepository
  extends Omit<
    Repositories<[VehicleEntity, number] | null>,
    FindAllRepository
  > {}
