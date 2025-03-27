import { FindClientBySocialNumberQuery } from './find-client-by-social-number.query'
import { SocialNumberMock } from '@mocks/client'

describe('[Queries] Find Client By Social Number Query', () => {
  it('should return a query object with the correct id', () => {
    const parameter = {
      social_security_number: SocialNumberMock
    }
    const query = FindClientBySocialNumberQuery(parameter)
    expect(query).toEqual({
      where: {
        social_security_number: SocialNumberMock
      }
    })
  })

  it('should handle undefined parameter', () => {
    const parameter = {}
    const query = FindClientBySocialNumberQuery(parameter)
    expect(query).toEqual({
      where: {
        social_security_number: undefined
      }
    })
  })

  it('should handle null parameter', () => {
    const parameter = { social_security_number: null }
    const query = FindClientBySocialNumberQuery(parameter)
    expect(query).toEqual({
      where: {
        social_security_number: null
      }
    })
  })
})
