import { BaseEntity } from '@domain/entities'
import { Client } from '@domain/interfaces'

export class ClientEntity extends BaseEntity {
  readonly name: string
  readonly mail: string
  readonly social_security_number: string
  readonly birth_date: Date

  private constructor(client: Client) {
    super(client.id, client.created_at, client.updated_at)
    this.name = client.name
    this.mail = client.mail
    this.birth_date = client.birth_date
  }

  static create(client: Client): ClientEntity {
    return new ClientEntity(client)
  }
}
