import {
  CreateVehicleRepository,
  FindVehicleByConditionRepository
} from '@application/repositories/vehicle'
import { CreateVehicleUC } from './create-vehicle.usecase'
import { CreateVehicle } from '@domain/interfaces/vehicle'
import { CreatedVehicleMock, CreateVehicleMock } from '@mocks/vehicle'
import { VehicleEntity } from '@domain/entities'
import { Logger } from '@infrastructure/logging'
import { HttpException } from '@common/errors'
import { ConflictStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'

describe('[Use Case] Create Vehicle Use Case', () => {
  let createVehicleUC: CreateVehicleUC
  let findVehicleByConditionRepository: jest.Mocked<FindVehicleByConditionRepository>
  let createVehicleRepository: jest.Mocked<CreateVehicleRepository>
  let logger: jest.SpyInstance

  const input = CreateVehicleMock as unknown as CreateVehicle
  const logInfo: string = '[CreateVehicleUC].execute'

  beforeEach(() => {
    findVehicleByConditionRepository = {
      findByCondition: jest.fn()
    } as unknown as jest.Mocked<FindVehicleByConditionRepository>

    createVehicleRepository = {
      create: jest.fn()
    } as unknown as jest.Mocked<CreateVehicleRepository>

    createVehicleUC = new CreateVehicleUC(
      findVehicleByConditionRepository,
      createVehicleRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the created vehicle', async () => {
    findVehicleByConditionRepository.findByCondition.mockResolvedValueOnce(null)
    createVehicleRepository.create.mockResolvedValueOnce(
      CreateVehicleMock as unknown as VehicleEntity
    )

    const result: VehicleEntity = await createVehicleUC.execute(input)

    expect(createVehicleUC.execute).toBeInstanceOf(Function)
    expect(result).toEqual(CreateVehicleMock)
    expect(logger).toHaveBeenCalledWith(logInfo)
  })

  it('should throw exception if the vehicle already exists', async () => {
    findVehicleByConditionRepository.findByCondition.mockResolvedValueOnce(
      CreatedVehicleMock as unknown as VehicleEntity
    )

    const httpException: HttpException = ConflictStub(Field.Vehicle)

    expect(createVehicleUC.execute).toBeInstanceOf(Function)
    expect(createVehicleUC.execute(input)).rejects.toThrow(httpException)
  })
})
