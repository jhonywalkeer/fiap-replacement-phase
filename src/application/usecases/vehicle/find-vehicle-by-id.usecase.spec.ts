import { VehicleEntity } from '@domain/entities'
import { FindVehicleByIdUC } from './find-vehicle-by-id.usecase'
import { FindVehicleByIdRepository } from '@application/repositories/vehicle'
import { IdentifierWithKeyMock } from '@mocks/common'
import { FindedVehicleByIdMock } from '@mocks/vehicle'
import { HttpException } from '@common/errors'
import { NotFoundStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'

describe('[Use Case] Find Vehicle By Id Use Case', () => {
  let findVehicleByIdUC: FindVehicleByIdUC
  let findVehicleByIdRepository: jest.Mocked<FindVehicleByIdRepository>

  const pathParameter = IdentifierWithKeyMock
  const vehicle = FindedVehicleByIdMock as unknown as VehicleEntity

  beforeEach(() => {
    findVehicleByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindVehicleByIdRepository>

    findVehicleByIdUC = new FindVehicleByIdUC(findVehicleByIdRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return vehicle by id', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce(vehicle)

    const result: VehicleEntity = await findVehicleByIdUC.execute(pathParameter)

    expect(findVehicleByIdUC.execute).toBeInstanceOf(Function)
    expect(findVehicleByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(result).toEqual(vehicle)
  })

  it('should throw exception if the not found vehicle', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Vehicle)

    expect(findVehicleByIdUC.execute).toBeInstanceOf(Function)
    expect(findVehicleByIdUC.execute(pathParameter)).rejects.toThrow(
      httpException
    )
  })
})
