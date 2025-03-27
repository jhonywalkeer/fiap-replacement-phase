import { CreateClientDTO } from '@application/dtos/client'
import { EmptyFiller } from '@common/constants'
import { IncorrectType, StatusCode } from '@common/enums'
import {
  HttpException,
  IncorrectFieldOrParamTypeError,
  NotProvidedError
} from '@common/errors'
import { Field } from '@domain/enums'
import {
  CreateClientMock,
  InputClientMock,
  SocialNumberMock
} from '@mocks/client'
import {
  IncorrectFieldOrParamTypeStub,
  NotProvidedStub
} from '@stubs/exceptions'

describe(`[DTO's] Create Client DTO`, () => {
  const input_date = new Date(InputClientMock.birth_date)
  const birth_date = new Date(CreateClientMock.birth_date)

  it('should call with the correct values', () => {
    const input: CreateClientDTO = new CreateClientDTO(
      CreateClientMock.name,
      CreateClientMock.social_security_number,
      CreateClientMock.mail,
      CreateClientMock.birth_date as any
    )

    expect(input).toBeInstanceOf(CreateClientDTO)
    expect(input.name).toBe(CreateClientMock.name)
    expect(input.social_security_number).toBe(SocialNumberMock)
    expect(input.mail).toBe(CreateClientMock.mail)
    expect(input_date).toEqual(birth_date)
  })

  it('should throw if name is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.ClientName,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          undefined as any,
          CreateClientMock.social_security_number,
          CreateClientMock.mail,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.ClientName, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if name is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.ClientName,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          EmptyFiller as any,
          CreateClientMock.social_security_number,
          CreateClientMock.mail,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.ClientName, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if name is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.ClientName,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          null as any,
          CreateClientMock.social_security_number,
          CreateClientMock.mail,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.ClientName, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if name is incorrect type', () => {
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Field,
      Field.ClientName
    )

    expect(
      () =>
        new CreateClientDTO(
          1 as any,
          SocialNumberMock,
          CreateClientMock.mail,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new IncorrectFieldOrParamTypeError(IncorrectType.Field, Field.ClientName)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if social security number is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.SocialSecurityNumber,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          undefined as any,
          CreateClientMock.mail,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.SocialSecurityNumber, IncorrectType.Field)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if social security number is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.SocialSecurityNumber,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          EmptyFiller as any,
          CreateClientMock.mail,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.SocialSecurityNumber, IncorrectType.Field)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if social security number is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.SocialSecurityNumber,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          null as any,
          CreateClientMock.mail,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.SocialSecurityNumber, IncorrectType.Field)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if social security number is incorrect type', () => {
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Field,
      Field.SocialSecurityNumber
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          1 as any,
          CreateClientMock.mail,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new IncorrectFieldOrParamTypeError(
        IncorrectType.Field,
        Field.SocialSecurityNumber
      ).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if mail is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Mail,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          CreateClientMock.social_security_number,
          undefined as any,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Mail, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if mail is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Mail,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          CreateClientMock.social_security_number,
          EmptyFiller as any,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Mail, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if mail is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Mail,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          CreateClientMock.social_security_number,
          null as any,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Mail, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if mail is incorrect type', () => {
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Field,
      Field.Mail
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          CreateClientMock.social_security_number,
          1 as any,
          CreateClientMock.birth_date as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new IncorrectFieldOrParamTypeError(IncorrectType.Field, Field.Mail)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if birth date is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.BirthDate,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          CreateClientMock.social_security_number,
          CreateClientMock.mail,
          undefined as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.BirthDate, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if birth date is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.BirthDate,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          CreateClientMock.social_security_number,
          CreateClientMock.mail,
          EmptyFiller as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.BirthDate, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if birth date is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.BirthDate,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          CreateClientMock.social_security_number,
          CreateClientMock.mail,
          null as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.BirthDate, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if birth date is incorrect type', () => {
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Field,
      Field.BirthDate
    )

    expect(
      () =>
        new CreateClientDTO(
          CreateClientMock.name,
          CreateClientMock.social_security_number,
          CreateClientMock.mail,
          1 as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new IncorrectFieldOrParamTypeError(IncorrectType.Field, Field.BirthDate)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })
})
