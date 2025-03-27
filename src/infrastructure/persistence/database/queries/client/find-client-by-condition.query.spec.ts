import { FindedClientByConditionMock } from '@mocks/client'
import { FindClientByConditionQuery } from './find-client-by-condition.query'
import { FindClientByCondition } from '@domain/interfaces'

describe('[Queries] Find Client By Condition Query', () => {
  it('should return a query object with the correct where clause', () => {
    const parameter: FindClientByCondition = {
      name: FindedClientByConditionMock.name,
      mail: FindedClientByConditionMock.mail,
      social_security_number:
        FindedClientByConditionMock.social_security_number,
      birth_date: new Date(FindedClientByConditionMock.birth_date)
    }

    const query = FindClientByConditionQuery(parameter)

    expect(query).toEqual({
      where: {
        name: FindedClientByConditionMock.name,
        mail: FindedClientByConditionMock.mail,
        social_security_number:
          FindedClientByConditionMock.social_security_number,
        birth_date: new Date(FindedClientByConditionMock.birth_date)
      }
    })
  })

  it('should handle missing optional fields', () => {
    const parameter: FindClientByCondition = {
      name: FindedClientByConditionMock.name,
      mail: FindedClientByConditionMock.mail,
      social_security_number: undefined as any,
      birth_date: undefined as any
    }

    const query = FindClientByConditionQuery(parameter)

    expect(query).toEqual({
      where: {
        name: FindedClientByConditionMock.name,
        mail: FindedClientByConditionMock.mail,
        social_security_number: undefined,
        birth_date: undefined
      }
    })
  })
})
