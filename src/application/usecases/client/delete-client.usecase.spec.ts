import {
  DeleteClientRepository,
  FindClientByIdRepository
} from '@application/repositories/client'
import { FindSaleByConditionRepository } from '@application/repositories/sale'
import { DeleteClientUC } from '@application/usecases/client'
import { HttpException } from '@common/errors'
import { ClientEntity, SaleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DeleteClient } from '@domain/interfaces/client'
import { Logger } from '@infrastructure/logging'
import { FindedClientByIdMock } from '@mocks/client'
import { IdentifierMock, numberOfCalls } from '@mocks/common'
import { FindedSaleByIdMock } from '@mocks/sale'
import { ConflictStub, NotFoundStub } from '@stubs/exceptions'

describe('[Use Case] Delete Client Use Case', () => {
  let deleteClientUC: DeleteClientUC
  let findClientByIdRepository: jest.Mocked<FindClientByIdRepository>
  let findSaleByClientRepository: jest.Mocked<FindSaleByConditionRepository>
  let deleteClientRepository: jest.Mocked<DeleteClientRepository>
  let logger: jest.SpyInstance

  const input = IdentifierMock as unknown as DeleteClient
  const client = FindedClientByIdMock as unknown as ClientEntity
  const sale = FindedSaleByIdMock as unknown as SaleEntity
  const logInfo: string = '[DeleteClientUC].execute'

  beforeEach(() => {
    findClientByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindClientByIdRepository>

    findSaleByClientRepository = {
      findByCondition: jest.fn()
    } as unknown as jest.Mocked<FindSaleByConditionRepository>

    deleteClientRepository = {
      delete: jest.fn()
    } as unknown as jest.Mocked<DeleteClientRepository>

    deleteClientUC = new DeleteClientUC(
      findClientByIdRepository,
      findSaleByClientRepository,
      deleteClientRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the deleted client', async () => {
    findClientByIdRepository.findById.mockResolvedValueOnce(client)
    findSaleByClientRepository.findByCondition.mockResolvedValueOnce(null)

    await deleteClientUC.execute(input)

    expect(deleteClientUC.execute).toBeInstanceOf(Function)
    expect(findClientByIdRepository.findById).toHaveBeenCalledTimes(
      numberOfCalls
    )
    expect(findClientByIdRepository.findById).toHaveBeenCalledWith(input)
    expect(findSaleByClientRepository.findByCondition).toHaveBeenCalledTimes(
      numberOfCalls
    )
    expect(findSaleByClientRepository.findByCondition).toHaveBeenCalledWith({
      buyer_id: FindedClientByIdMock.id
    })
    expect(deleteClientRepository.delete).toHaveBeenCalledTimes(numberOfCalls)
    expect(deleteClientRepository.delete).toHaveBeenCalledWith(input)
    expect(logger).toHaveBeenCalledWith(logInfo)
  })

  it('should throw exception if the client not already exists', async () => {
    findClientByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Client)

    expect(deleteClientUC.execute(input)).rejects.toThrow(httpException)
    expect(deleteClientUC.execute).toBeInstanceOf(Function)
    expect(findClientByIdRepository.findById).toHaveBeenCalledTimes(
      numberOfCalls
    )
    expect(findClientByIdRepository.findById).toHaveBeenCalledWith(input)
    expect(findSaleByClientRepository.findByCondition).not.toHaveBeenCalled()
    expect(deleteClientRepository.delete).not.toHaveBeenCalled()
  })

  it('should throw exception if the client with sale already exists', async () => {
    findClientByIdRepository.findById.mockResolvedValueOnce(client)
    findSaleByClientRepository.findByCondition.mockResolvedValueOnce(sale)

    const httpException: HttpException = ConflictStub(Field.Sale)

    expect(deleteClientUC.execute).toBeInstanceOf(Function)
    expect(deleteClientUC.execute(input)).rejects.toThrow(httpException)
    expect(findClientByIdRepository.findById).toHaveBeenCalledTimes(
      numberOfCalls
    )
    expect(findClientByIdRepository.findById).toHaveBeenCalledWith(input)
    expect(deleteClientRepository.delete).not.toHaveBeenCalled()
  })
})
