import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { ClientEntity } from '@domain/entities'

export interface FindClientByConditionRepository
  extends Omit<Repositories<ClientEntity | null>, FindByConditionRepository> {}
