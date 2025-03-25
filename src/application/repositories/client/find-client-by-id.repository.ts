import { ClientEntity } from '@domain/entities'
import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types'

export interface FindClientByIdRepository
  extends Omit<Repositories<ClientEntity | null>, FindByIdRepository> {}
