import { ClientEntity } from '@domain/entities'
import { FindClientBySocialNumber } from '@domain/interfaces/client'

export interface FindClientBySocialNumberUseCase {
  execute(payload: FindClientBySocialNumber): Promise<ClientEntity> | never
}
