import { Repositories } from '@application/repositories/common'
import { FindAllRepository } from '@common/types'
import { ClientEntity } from '@domain/entities'

export interface FindAllClientsRepository
  extends Omit<
    Repositories<[ClientEntity[], number] | null>,
    FindAllRepository
  > {}
