import { UpdateClientDTO } from '@application/dtos/client'
import { EmptyFiller } from '@common/constants'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import { HttpException, NotProvidedError } from '@common/errors'
import { Field } from '@domain/enums'
import { SocialNumberMock, UpdateClientMock } from '@mocks/client'
import { NotProvidedStub } from '@stubs/exceptions'

describe(`[DTO's] Update Client DTO`, () => {
  it('should call with the correct values', () => {
    const input: UpdateClientDTO = new UpdateClientDTO(
      UpdateClientMock.id,
      UpdateClientMock.name,
      UpdateClientMock.social_security_number,
      UpdateClientMock.mail,
      UpdateClientMock.birth_date as unknown as Date
    )

    expect(input).toBeInstanceOf(UpdateClientDTO)
    expect(input.name).toBe(UpdateClientMock.name)
    expect(input.social_security_number).toBe(SocialNumberMock)
    expect(input.mail).toBe(UpdateClientMock.mail)
    expect(new Date(input.birth_date as unknown as Date)).toEqual(
      new Date(UpdateClientMock.birth_date)
    )
  })

  it('should call with just the id', () => {
    const input: UpdateClientDTO = new UpdateClientDTO(
      UpdateClientMock.id,
      undefined,
      undefined,
      undefined,
      undefined
    )

    expect(input).toBeInstanceOf(UpdateClientDTO)
    expect(input.id).toBe(UpdateClientMock.id)
    expect(input.name).toBe(undefined)
    expect(input.social_security_number).toBe(undefined)
    expect(input.mail).toBe(undefined)
    expect(input.birth_date).toBe(undefined)
  })

  it('should throw if id is not provided', () => {
    const input: string = EmptyFiller
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )

    expect(() => new UpdateClientDTO(input)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })

  it('should throw if name is not provided', () => {
    const input: UpdateClientDTO = new UpdateClientDTO(
      UpdateClientMock.id,
      undefined,
      UpdateClientMock.social_security_number,
      UpdateClientMock.mail,
      UpdateClientMock.birth_date as unknown as Date
    )

    expect(input).toBeInstanceOf(UpdateClientDTO)
    expect(input.id).toBe(UpdateClientMock.id)
    expect(input.name).toBe(undefined)
    expect(input.social_security_number).toBe(SocialNumberMock)
    expect(input.mail).toBe(UpdateClientMock.mail)
    expect(new Date(input.birth_date as unknown as Date)).toEqual(
      new Date(UpdateClientMock.birth_date)
    )
  })

  it('should throw if social security number is not provided', () => {
    const input: UpdateClientDTO = new UpdateClientDTO(
      UpdateClientMock.id,
      UpdateClientMock.name,
      undefined,
      UpdateClientMock.mail,
      UpdateClientMock.birth_date as unknown as Date
    )

    expect(input).toBeInstanceOf(UpdateClientDTO)
    expect(input.id).toBe(UpdateClientMock.id)
    expect(input.name).toBe(UpdateClientMock.name)
    expect(input.social_security_number).toBe(undefined)
    expect(input.mail).toBe(UpdateClientMock.mail)
    expect(new Date(input.birth_date as unknown as Date)).toEqual(
      new Date(UpdateClientMock.birth_date)
    )
  })

  it('should throw if social security number is not provided', () => {
    const input: UpdateClientDTO = new UpdateClientDTO(
      UpdateClientMock.id,
      UpdateClientMock.name,
      undefined,
      UpdateClientMock.mail,
      UpdateClientMock.birth_date as unknown as Date
    )

    expect(input).toBeInstanceOf(UpdateClientDTO)
    expect(input.id).toBe(UpdateClientMock.id)
    expect(input.name).toBe(UpdateClientMock.name)
    expect(input.social_security_number).toBe(undefined)
    expect(input.mail).toBe(UpdateClientMock.mail)
    expect(new Date(input.birth_date as unknown as Date)).toEqual(
      new Date(UpdateClientMock.birth_date)
    )
  })

  it('should throw if mail is not provided', () => {
    const input: UpdateClientDTO = new UpdateClientDTO(
      UpdateClientMock.id,
      UpdateClientMock.name,
      UpdateClientMock.social_security_number,
      undefined,
      UpdateClientMock.birth_date as unknown as Date
    )

    expect(input).toBeInstanceOf(UpdateClientDTO)
    expect(input.id).toBe(UpdateClientMock.id)
    expect(input.name).toBe(UpdateClientMock.name)
    expect(input.social_security_number).toBe(SocialNumberMock)
    expect(input.mail).toBe(undefined)
    expect(new Date(input.birth_date as unknown as Date)).toEqual(
      new Date(UpdateClientMock.birth_date)
    )
  })

  it('should throw if birth date is not provided', () => {
    const input: UpdateClientDTO = new UpdateClientDTO(
      UpdateClientMock.id,
      UpdateClientMock.name,
      UpdateClientMock.social_security_number,
      UpdateClientMock.mail,
      undefined
    )

    expect(input).toBeInstanceOf(UpdateClientDTO)
    expect(input.id).toBe(UpdateClientMock.id)
    expect(input.name).toBe(UpdateClientMock.name)
    expect(input.social_security_number).toBe(SocialNumberMock)
    expect(input.mail).toBe(UpdateClientMock.mail)
    expect(input.birth_date).toBe(undefined)
  })
})
