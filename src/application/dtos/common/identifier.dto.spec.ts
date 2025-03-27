import { IdentifierDTO } from '@application/dtos/common'
import { EmptyFiller } from '@common/constants'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import { HttpException, NotProvidedError } from '@common/errors'
import { Field } from '@domain/enums'
import { IdentifierMock } from '@mocks/common'
import { IsUUID } from '@presentation/validators'
import { NotProvidedStub } from '@stubs/exceptions'

jest.mock('@presentation/validators/is-uuid.validator')

describe(`[DTO's] Identifier DTO`, () => {
  it('should call with the correct id', () => {
    const input: string = IdentifierMock
    new IdentifierDTO(input)

    expect(IsUUID).toHaveBeenCalledWith(input, Field.Id)
  })

  it('should throw an error if id is empty string', () => {
    const input: string = EmptyFiller
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )

    expect(() => new IdentifierDTO(input)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })
})
