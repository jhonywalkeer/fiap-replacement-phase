import { PaginateDTO } from '@application/dtos/common'
import { PaginationValuesAssert } from '@assertions/pagination'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import { HttpException, IncorrectFieldOrParamTypeError } from '@common/errors'
import { Field } from '@domain/enums'
import {
  InvalidOrderMock,
  LimitMock,
  PageMock,
  SortMock
} from '@mocks/pagination'
import { IncorrectFieldOrParamTypeStub } from '@stubs/exceptions'

describe(`[DTO's] Pagination DTO`, () => {
  it.each(PaginationValuesAssert)(
    'should return $description',
    ({ input, expected }) => {
      expect(input.page).toBe(expected.page)
      expect(input.limit).toBe(expected.limit)
      expect(input.sort).toBe(expected.sort)
      expect(input.order).toBe(expected.order)
    }
  )

  it('should throw an exception if the order parameter is invalid', () => {
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Param,
      Field.Order
    )

    expect(
      () => new PaginateDTO(PageMock, LimitMock, SortMock, InvalidOrderMock)
    ).toThrow(httpException)

    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(
      new IncorrectFieldOrParamTypeError(IncorrectType.Param, Field.Order)
        .message
    )
  })
})
