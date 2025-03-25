import { ClientEntity } from '@domain/entities'
import { UpdateClient } from '@domain/interfaces'

export interface UpdateClientUseCase {
  execute(payload: UpdateClient): Promise<ClientEntity> | never
}
