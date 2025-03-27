import { IdentifierMock } from '@mocks/common'
import { ClientEntity } from './client.entity'
import { Client } from '@domain/interfaces'
import {
  ClientMailMock,
  CreateClientMock,
  SocialNumberMock
} from '@mocks/client'

describe('[Entities] Client Entity', () => {
  const clientData: Client = {
    id: IdentifierMock,
    name: CreateClientMock.name,
    mail: ClientMailMock,
    social_security_number: SocialNumberMock,
    birth_date: new Date(CreateClientMock.birth_date),
    created_at: new Date(),
    updated_at: new Date()
  }

  it('should create a ClientEntity instance', () => {
    const clientEntity = ClientEntity.create(clientData)
    expect(clientEntity).toBeInstanceOf(ClientEntity)
  })

  it('should inherit properties from BaseEntity', () => {
    const clientEntity = ClientEntity.create(clientData)
    expect(clientEntity.id).toBe(clientData.id)
    expect(clientEntity.created_at).toBe(clientData.created_at)
    expect(clientEntity.updated_at).toBe(clientData.updated_at)
  })
})
