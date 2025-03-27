import { FindAllVehiclesRepository } from '@application/repositories/vehicle'
import { FindAllVehiclesUC } from './find-all-vehicles.usecase'
import { PaginationAndFilter } from '@common/interfaces'
import { Pagination } from '@common/constants'
import { FindAllVehiclesMock } from '@mocks/vehicle'
import { VehicleEntity } from '@domain/entities'
import { numberOfCalls } from '@mocks/common'
import { HttpException } from '@common/errors'
import { NotFoundStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'

describe('[Use Case] Find All Vehicles Use Case', () => {
  let findAllVehiclesUC: FindAllVehiclesUC
  let findAllVehiclesRepository: jest.Mocked<FindAllVehiclesRepository>

  const queryParameters: PaginationAndFilter = {
    page: Pagination.Default.Page,
    limit: Pagination.Default.Limit
  }
  const vehicles = FindAllVehiclesMock as unknown as [VehicleEntity, number]

  beforeEach(() => {
    findAllVehiclesRepository = {
      findAll: jest.fn()
    } as unknown as jest.Mocked<FindAllVehiclesRepository>

    findAllVehiclesUC = new FindAllVehiclesUC(findAllVehiclesRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all vehicles', async () => {
    findAllVehiclesRepository.findAll.mockResolvedValueOnce(vehicles)

    const result: [VehicleEntity, number] =
      await findAllVehiclesUC.execute(queryParameters)

    expect(findAllVehiclesUC.execute).toBeInstanceOf(Function)
    expect(findAllVehiclesRepository.findAll).toHaveBeenCalledTimes(
      numberOfCalls
    )
    expect(result).toEqual(vehicles)
  })

  it('should throw exception if the not found vehicles', async () => {
    findAllVehiclesRepository.findAll.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Vehicle)

    expect(findAllVehiclesUC.execute).toBeInstanceOf(Function)
    expect(findAllVehiclesUC.execute(queryParameters)).rejects.toThrow(
      httpException
    )
  })
})
