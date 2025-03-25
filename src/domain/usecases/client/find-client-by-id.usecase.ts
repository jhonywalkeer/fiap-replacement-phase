import { ClientEntity } from '@domain/entities'
import { FindClientById } from '@domain/interfaces'

export interface FindClientByIdUseCase {
  execute(payload: FindClientById): Promise<ClientEntity> | never
}
