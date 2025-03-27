import { FindClientBySocialNumberRepository } from '@application/repositories/client'
import { FindClientBySocialNumberUC } from '@application/usecases/client'
import { FindedClientBySocialNumberMock, SocialNumberMock } from '@mocks/client'
import { FindClientBySocialNumber } from '@domain/interfaces'
import { ClientEntity } from '@domain/entities'
import { HttpException } from '@common/errors'
import { NotFoundStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'
import { numberOfCalls } from '@mocks/common'

describe('[Use Case] Find Client By Social Number Use Case', () => {
  let findClientBySocialNumberUC: FindClientBySocialNumberUC
  let findClientBySocialNumberRepository: jest.Mocked<FindClientBySocialNumberRepository>

  const pathParameter = SocialNumberMock as unknown as FindClientBySocialNumber
  const client = FindedClientBySocialNumberMock as unknown as ClientEntity

  beforeEach(() => {
    findClientBySocialNumberRepository = {
      findBySocialNumber: jest.fn()
    } as unknown as jest.Mocked<FindClientBySocialNumberRepository>

    findClientBySocialNumberUC = new FindClientBySocialNumberUC(
      findClientBySocialNumberRepository
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return client by social security number', async () => {
    findClientBySocialNumberRepository.findBySocialNumber.mockResolvedValueOnce(
      client
    )

    const result: FindClientBySocialNumber =
      await findClientBySocialNumberUC.execute(pathParameter)

    expect(findClientBySocialNumberUC.execute).toBeInstanceOf(Function)
    expect(
      findClientBySocialNumberRepository.findBySocialNumber
    ).toHaveBeenCalledTimes(numberOfCalls)
    expect(result).toEqual(client)
  })

  it('should throw exception if the not found client', async () => {
    findClientBySocialNumberRepository.findBySocialNumber.mockResolvedValueOnce(
      null
    )

    const httpException: HttpException = NotFoundStub(Field.Client)

    expect(findClientBySocialNumberUC.execute).toBeInstanceOf(Function)
    expect(findClientBySocialNumberUC.execute(pathParameter)).rejects.toThrow(
      httpException
    )
  })
})
