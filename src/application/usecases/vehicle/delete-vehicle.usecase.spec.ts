import {
  DeleteVehicleRepository,
  FindVehicleByIdRepository
} from '@application/repositories/vehicle'
import { DeleteVehicleUC } from './delete-vehicle.usecase'
import { DeleteVehicle } from '@domain/interfaces/vehicle'
import { IdentifierMock } from '@mocks/common'
import { Logger } from '@infrastructure/logging'
import { FindedVehicleByIdMock } from '@mocks/vehicle'
import { VehicleEntity } from '@domain/entities'
import { HttpException } from '@common/errors'
import { NotFoundStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'

describe('[Use Case] Delete Vehicle Use Case', () => {
  let deleteVehicleUC: DeleteVehicleUC
  let findVehicleByIdRepository: jest.Mocked<FindVehicleByIdRepository>
  let deleteVehicleRepository: jest.Mocked<DeleteVehicleRepository>
  let logger: jest.SpyInstance

  const input = IdentifierMock as unknown as DeleteVehicle
  const logInfo: string = '[DeleteVehicleUC].execute'
  const vehicle = FindedVehicleByIdMock as unknown as VehicleEntity

  beforeEach(() => {
    findVehicleByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindVehicleByIdRepository>

    deleteVehicleRepository = {
      delete: jest.fn()
    } as unknown as jest.Mocked<DeleteVehicleRepository>

    deleteVehicleUC = new DeleteVehicleUC(
      findVehicleByIdRepository,
      deleteVehicleRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the sucess deleted vehicle', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce(vehicle)

    await deleteVehicleUC.execute(input)

    expect(deleteVehicleUC.execute).toBeInstanceOf(Function)
    expect(logger).toHaveBeenCalledWith(logInfo)
  })

  it('should throw exception if the vehicle not already exists', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Vehicle)

    await expect(deleteVehicleUC.execute(input)).rejects.toThrow(httpException)
  })
})
