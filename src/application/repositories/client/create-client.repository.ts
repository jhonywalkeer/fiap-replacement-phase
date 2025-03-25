import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { ClientEntity } from '@domain/entities'

export interface CreateClientRepository
  extends Omit<Repositories<ClientEntity>, CreateRepository> {}
