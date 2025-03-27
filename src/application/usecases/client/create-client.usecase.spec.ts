import { CreateClientUC } from '@application/usecases/client'
import {
  CreateClientRepository,
  FindClientByConditionRepository
} from '@application/repositories/client'
import {
  CreatedClientMock,
  FindedClientByConditionMock,
  CreateClientMock
} from '@mocks/client'
import { ClientEntity } from '@domain/entities'
import { CreateClient } from '@domain/interfaces'
import { Field } from '@domain/enums'
import { ConflictStub } from '@stubs/exceptions'
import { HttpException } from '@common/errors'
import { Logger } from '@infrastructure/logging'
import { numberOfCalls } from '@mocks/common'

describe('[Use Case] Create Client Use Case', () => {
  let createClientUC: CreateClientUC
  let findClientByConditionRepository: jest.Mocked<FindClientByConditionRepository>
  let createClientRepository: jest.Mocked<CreateClientRepository>
  let logger: jest.SpyInstance

  const input = CreateClientMock as unknown as CreateClient
  const logInfo: string = '[CreateClientUC].execute'

  beforeEach(() => {
    findClientByConditionRepository = {
      findByCondition: jest.fn()
    } as unknown as jest.Mocked<FindClientByConditionRepository>

    createClientRepository = {
      create: jest.fn()
    } as unknown as jest.Mocked<CreateClientRepository>

    createClientUC = new CreateClientUC(
      findClientByConditionRepository,
      createClientRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the created client', async () => {
    findClientByConditionRepository.findByCondition.mockResolvedValueOnce(null)
    createClientRepository.create.mockResolvedValueOnce(
      CreatedClientMock as unknown as ClientEntity
    )

    const result: ClientEntity = await createClientUC.execute(input as any)

    expect(createClientUC.execute).toBeInstanceOf(Function)
    expect(
      findClientByConditionRepository.findByCondition
    ).toHaveBeenCalledTimes(numberOfCalls)
    expect(
      findClientByConditionRepository.findByCondition
    ).toHaveBeenCalledWith(input)
    expect(createClientRepository.create).toHaveBeenCalledTimes(numberOfCalls)
    expect(createClientRepository.create).toHaveBeenCalledWith(input)
    expect(logger).toHaveBeenCalledWith(logInfo)
    expect(result).toEqual(CreatedClientMock)
  })

  it('should throw exception if the user already exists', async () => {
    findClientByConditionRepository.findByCondition.mockResolvedValueOnce(
      FindedClientByConditionMock as unknown as ClientEntity
    )

    const httpException: HttpException = ConflictStub(Field.Client)

    expect(
      createClientUC.execute(input as unknown as CreateClient)
    ).rejects.toThrow(httpException)
    expect(createClientUC.execute).toBeInstanceOf(Function)
    expect(
      findClientByConditionRepository.findByCondition
    ).toHaveBeenCalledTimes(numberOfCalls)
    expect(
      findClientByConditionRepository.findByCondition
    ).toHaveBeenCalledWith(input)
    expect(createClientRepository.create).not.toHaveBeenCalled()
  })
})
