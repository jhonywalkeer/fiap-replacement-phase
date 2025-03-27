import { FindAllClientsRepository } from '@application/repositories/client'
import { FindAllClientsUC } from '@application/usecases/client'
import { Pagination } from '@common/constants'
import { HttpException } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllClientsMock } from '@mocks/client'
import { numberOfCalls } from '@mocks/common'
import { NotFoundStub } from '@stubs/exceptions'

describe('[Use Case] Find All Clients Use Case', () => {
  let findAllClientsUC: FindAllClientsUC
  let findAllClientsRepository: jest.Mocked<FindAllClientsRepository>

  const queryParameters: PaginationAndFilter = {
    page: Pagination.Default.Page,
    limit: Pagination.Default.Limit
  }
  const clients = FindAllClientsMock as unknown as [ClientEntity[], number]

  beforeEach(() => {
    findAllClientsRepository = {
      findAll: jest.fn()
    } as unknown as jest.Mocked<FindAllClientsRepository>

    findAllClientsUC = new FindAllClientsUC(findAllClientsRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all clients', async () => {
    findAllClientsRepository.findAll.mockResolvedValueOnce(clients)

    const result: [ClientEntity[], number] =
      await findAllClientsUC.execute(queryParameters)

    expect(findAllClientsUC.execute).toBeInstanceOf(Function)
    expect(findAllClientsRepository.findAll).toHaveBeenCalledTimes(
      numberOfCalls
    )
    expect(result).toEqual(clients)
  })

  it('should throw exception if the not found clients', async () => {
    findAllClientsRepository.findAll.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Client)

    expect(findAllClientsUC.execute).toBeInstanceOf(Function)
    expect(findAllClientsUC.execute(queryParameters)).rejects.toThrow(
      httpException
    )
  })
})
