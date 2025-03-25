import { ClientEntity } from '@domain/entities'
import { Repositories } from '@application/repositories/common'
import { FindBySocialNumberRepository } from '@common/types'

export interface FindClientBySocialNumberRepository
  extends Omit<
    Repositories<ClientEntity | null>,
    FindBySocialNumberRepository
  > {}
