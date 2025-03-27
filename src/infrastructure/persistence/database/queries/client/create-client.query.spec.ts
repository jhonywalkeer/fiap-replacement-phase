import { CreateClientMock } from '@mocks/client'
import { CreateClientQuery } from './create-client.query'
import { CreateClient } from '@domain/interfaces/client'

describe('[Queries] Create Client Query', () => {
  it('should create a client query with the correct data', () => {
    const input: CreateClient = {
      name: CreateClientMock.name,
      mail: CreateClientMock.mail,
      social_security_number: CreateClientMock.social_security_number,
      birth_date: new Date(CreateClientMock.birth_date)
    }

    const result = CreateClientQuery(input)

    expect(result).toEqual({
      data: {
        name: CreateClientMock.name,
        mail: CreateClientMock.mail,
        social_security_number: CreateClientMock.social_security_number,
        birth_date: new Date(CreateClientMock.birth_date)
      }
    })
  })
})
