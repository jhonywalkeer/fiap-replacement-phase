import { UpdateClientMock } from '@mocks/client'
import { UpdateClientQuery } from './update-client.query'
import { UpdateClient } from '@domain/interfaces/client'

describe('[Queries] Update Client By id Query', () => {
  it('should return the correct query object when valid input is provided', () => {
    const input: UpdateClient = {
      id: UpdateClientMock.id,
      name: UpdateClientMock.name,
      mail: UpdateClientMock.mail,
      social_security_number: UpdateClientMock.social_security_number,
      birth_date: new Date(UpdateClientMock.birth_date)
    }

    const result = UpdateClientQuery(input)

    expect(result).toEqual({
      where: {
        id: input.id
      },
      data: {
        name: input.name,
        mail: input.mail,
        social_security_number: input.social_security_number,
        birth_date: input.birth_date
      }
    })
  })
})
