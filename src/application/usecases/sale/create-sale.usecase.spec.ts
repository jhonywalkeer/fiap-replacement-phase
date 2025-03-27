import {
  CreateSaleRepository,
  FindSaleByConditionRepository
} from '@application/repositories/sale'
import { CreateSaleUC } from './create-sale.usecase'
import {
  FindVehicleByIdRepository,
  UpdateVehicleRepository
} from '@application/repositories/vehicle'
import { CreatedVehicleMock } from '@mocks/vehicle'
import { SaleEntity, VehicleEntity } from '@domain/entities'
import { CreatedSaleMock } from '@mocks/sale'
import { ConflictStub, NotFoundStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'
import { HttpException } from '@common/errors'

describe('[Use Case] Create Sale Use Case', () => {
  let createSaleUC: CreateSaleUC
  let findVehicleByIdRepository: jest.Mocked<FindVehicleByIdRepository>
  let updateVehicleRepository: jest.Mocked<UpdateVehicleRepository>
  let findSaleByConditionRepository: jest.Mocked<FindSaleByConditionRepository>
  let createSaleRepository: jest.Mocked<CreateSaleRepository>

  const input = {}
  const vehicle = CreatedVehicleMock as unknown as VehicleEntity
  const sale = CreatedSaleMock as unknown as SaleEntity

  beforeEach(() => {
    updateVehicleRepository = {
      update: jest.fn()
    } as unknown as jest.Mocked<UpdateVehicleRepository>

    findVehicleByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindVehicleByIdRepository>

    findSaleByConditionRepository = {
      findByCondition: jest.fn()
    } as unknown as jest.Mocked<FindSaleByConditionRepository>

    createSaleRepository = {
      create: jest.fn()
    } as unknown as jest.Mocked<CreateSaleRepository>

    createSaleUC = new CreateSaleUC(
      findSaleByConditionRepository,
      findVehicleByIdRepository,
      updateVehicleRepository,
      createSaleRepository
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw exception if the vehicle not found', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Vehicle)

    await expect(createSaleUC.execute(input as any)).rejects.toThrow(
      httpException
    )
  })

  it('should throw exception if the sale already exists', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce(vehicle)
    findSaleByConditionRepository.findByCondition.mockResolvedValueOnce(sale)

    const httpException: HttpException = ConflictStub(Field.Sale)

    await expect(createSaleUC.execute(input as any)).rejects.toThrow(
      httpException
    )
  })
})
