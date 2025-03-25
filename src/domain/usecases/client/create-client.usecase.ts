import { ClientEntity } from '@domain/entities'
import { CreateClient } from '@domain/interfaces/client'

export interface CreateClientUseCase {
  execute(payload: CreateClient): Promise<ClientEntity> | never
}
