import { Repositories } from '@application/repositories/common'
import { UpdateRepository } from '@common/types'
import { ClientEntity } from '@domain/entities'

export interface UpdateClientRepository
  extends Omit<Repositories<ClientEntity | null>, UpdateRepository> {}
