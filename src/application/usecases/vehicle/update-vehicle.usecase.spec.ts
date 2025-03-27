import {
  FindVehicleByIdRepository,
  UpdateVehicleRepository
} from '@application/repositories/vehicle'
import { UpdateVehicleUC } from './update-vehicle.usecase'
import {
  FindedVehicleByIdMock,
  UpdatedVehicleMock,
  UpdateVehicleMock
} from '@mocks/vehicle'
import { VehicleEntity } from '@domain/entities'
import { Logger } from '@infrastructure/logging'
import { NotFoundStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'
import { HttpException } from '@common/errors'
import { UpdateClient } from '@domain/interfaces/client'
import { IdentifierWithKeyMock } from '@mocks/common'

describe('[Use Case] Update Vehicle Use Case', () => {
  let updateVehicleUC: UpdateVehicleUC
  let findVehicleByIdRepository: jest.Mocked<FindVehicleByIdRepository>
  let updateVehicleRepository: jest.Mocked<UpdateVehicleRepository>
  let logger: jest.SpyInstance

  const input = UpdateVehicleMock as unknown as UpdateClient
  const findedVehicle = FindedVehicleByIdMock as unknown as VehicleEntity
  const updatedVehicle = UpdatedVehicleMock as unknown as VehicleEntity
  const logInfo: string = '[UpdateVehicleUC].execute'

  beforeEach(() => {
    findVehicleByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindVehicleByIdRepository>

    updateVehicleRepository = {
      update: jest.fn()
    } as unknown as jest.Mocked<UpdateVehicleRepository>

    updateVehicleUC = new UpdateVehicleUC(
      findVehicleByIdRepository,
      updateVehicleRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the updated vehicle', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce(findedVehicle)
    updateVehicleRepository.update.mockResolvedValueOnce(updatedVehicle)

    const result = await updateVehicleUC.execute(input)

    expect(updateVehicleUC.execute).toBeInstanceOf(Function)
    expect(findVehicleByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(updateVehicleRepository.update).toHaveBeenCalledTimes(1)
    expect(logger).toHaveBeenCalledWith(logInfo)
    expect(result).toEqual(updatedVehicle)
  })

  it('should throw exception if the not found vehicle', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Vehicle)

    expect(updateVehicleUC.execute).toBeInstanceOf(Function)
    expect(updateVehicleUC.execute(input)).rejects.toThrow(httpException)
  })

  it('should return the updated vehicle if only the id is informed', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce(findedVehicle)
    updateVehicleRepository.update.mockResolvedValueOnce(updatedVehicle)

    const result = await updateVehicleUC.execute(IdentifierWithKeyMock)

    expect(updateVehicleUC.execute).toBeInstanceOf(Function)
    expect(findVehicleByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(updateVehicleRepository.update).toHaveBeenCalledTimes(1)
    expect(logger).toHaveBeenCalledWith(logInfo)
    expect(result).toEqual(updatedVehicle)
  })
})
