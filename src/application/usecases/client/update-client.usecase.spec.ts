import {
  FindClientByIdRepository,
  UpdateClientRepository
} from '@application/repositories/client'
import { UpdateClientUC } from '@application/usecases/client'
import { HttpException } from '@common/errors'
import { ClientEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { Logger } from '@infrastructure/logging'
import { FindedClientByIdMock, UpdateClientMock } from '@mocks/client'
import { IdentifierWithKeyMock, numberOfCalls } from '@mocks/common'
import { NotFoundStub } from '@stubs/exceptions'

describe('[Use Case] Update Client Use Case', () => {
  let updateClientUC: UpdateClientUC
  let findClientByIdRepository: jest.Mocked<FindClientByIdRepository>
  let updateClientRepository: jest.Mocked<UpdateClientRepository>
  let logger: jest.SpyInstance

  const findedClient = FindedClientByIdMock as unknown as ClientEntity
  const updatedClient = UpdateClientMock as unknown as ClientEntity
  const logInfo: string = '[UpdateClientUC].execute'

  beforeEach(() => {
    findClientByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindClientByIdRepository>

    updateClientRepository = {
      update: jest.fn()
    } as unknown as jest.Mocked<UpdateClientRepository>

    updateClientUC = new UpdateClientUC(
      findClientByIdRepository,
      updateClientRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the updated client', async () => {
    findClientByIdRepository.findById.mockResolvedValueOnce(findedClient)
    updateClientRepository.update.mockResolvedValueOnce(updatedClient)

    const result = await updateClientUC.execute(UpdateClientMock as any)

    expect(updateClientUC.execute).toBeInstanceOf(Function)
    expect(findClientByIdRepository.findById).toHaveBeenCalledTimes(
      numberOfCalls
    )
    expect(updateClientRepository.update).toHaveBeenCalledTimes(numberOfCalls)
    expect(logger).toHaveBeenCalledWith(logInfo)
    expect(result).toEqual(updatedClient)
  })

  it('should return the updated client if only the id is informed', async () => {
    findClientByIdRepository.findById.mockResolvedValueOnce(findedClient)
    updateClientRepository.update.mockResolvedValueOnce(updatedClient)

    const result = await updateClientUC.execute(IdentifierWithKeyMock)

    expect(updateClientUC.execute).toBeInstanceOf(Function)
    expect(findClientByIdRepository.findById).toHaveBeenCalledTimes(
      numberOfCalls
    )
    expect(updateClientRepository.update).toHaveBeenCalledTimes(numberOfCalls)
    expect(logger).toHaveBeenCalledWith(logInfo)
    expect(result).toEqual(updatedClient)
  })

  it('should throw exception if the not found client', async () => {
    findClientByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Client)

    expect(updateClientUC.execute).toBeInstanceOf(Function)
    expect(updateClientUC.execute(UpdateClientMock as any)).rejects.toThrow(
      httpException
    )
  })
})
