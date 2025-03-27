import {
  CreatePaymentRepository,
  FindPaymentByConditionRepository
} from '@application/repositories/payment'
import { CreatePaymentUC } from './create-payment.usecase'
import {
  FindSaleByIdRepository,
  UpdateSaleWithPaymentRepository
} from '@application/repositories/sale'
import { FindClientByIdRepository } from '@application/repositories/client'
import {
  FindVehicleByIdRepository,
  UpdateVehicleStatusRepository
} from '@application/repositories/vehicle'
import { PaymentExternalGateway } from '@infrastructure/gateways/payment'
import { CreatedPaymentMock, CreatePaymentMock } from '@mocks/payment'
import { CreatePayment } from '@domain/interfaces/payment'
import { CreatedSaleMock } from '@mocks/sale'
import { ClientEntity, SaleEntity, VehicleEntity } from '@domain/entities'
import { CreatedClientMock } from '@mocks/client'
import { CreatedVehicleMock } from '@mocks/vehicle'
import { Field, PaymentStatus, VehicleStatus } from '@domain/enums'
import { HttpException } from '@common/errors'
import { BadRequestStub, ConflictStub, NotFoundStub } from '@stubs/exceptions'
import { ErrorMessage } from '@common/enums'

describe('[Use Case] Create Payment Use Case', () => {
  let createPaymentUC: CreatePaymentUC
  let findPaymentByConditionRepository: jest.Mocked<FindPaymentByConditionRepository>
  let findSaleByIdRepository: jest.Mocked<FindSaleByIdRepository>
  let findClientByIdRepository: jest.Mocked<FindClientByIdRepository>
  let findVehicleByIdRepository: jest.Mocked<FindVehicleByIdRepository>
  let createPaymentRepository: jest.Mocked<CreatePaymentRepository>
  let paymentExternalGateway: jest.Mocked<PaymentExternalGateway>
  let updateVehicleStatusRepository: jest.Mocked<UpdateVehicleStatusRepository>
  let updateSaleWithPaymentRepository: jest.Mocked<UpdateSaleWithPaymentRepository>

  const input = {
    ...CreatePaymentMock,
    amount: CreatedVehicleMock.price
  } as unknown as CreatePayment

  beforeEach(() => {
    findPaymentByConditionRepository = {
      findByCondition: jest.fn()
    } as unknown as jest.Mocked<FindPaymentByConditionRepository>

    findSaleByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindSaleByIdRepository>

    findClientByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindClientByIdRepository>

    findVehicleByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindVehicleByIdRepository>

    createPaymentRepository = {
      create: jest.fn()
    } as unknown as jest.Mocked<CreatePaymentRepository>

    paymentExternalGateway = {
      create: jest.fn()
    } as unknown as jest.Mocked<PaymentExternalGateway>

    updateVehicleStatusRepository = {
      updateVehicleWithStatus: jest.fn()
    } as unknown as jest.Mocked<UpdateVehicleStatusRepository>

    updateSaleWithPaymentRepository = {
      updateSaleWithPaymentId: jest.fn()
    } as unknown as jest.Mocked<UpdateSaleWithPaymentRepository>

    createPaymentUC = new CreatePaymentUC(
      findPaymentByConditionRepository,
      findSaleByIdRepository,
      findClientByIdRepository,
      findVehicleByIdRepository,
      createPaymentRepository,
      paymentExternalGateway,
      updateVehicleStatusRepository,
      updateSaleWithPaymentRepository
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the created payment', async () => {
    findPaymentByConditionRepository.findByCondition.mockResolvedValueOnce(null)
    findSaleByIdRepository.findById.mockResolvedValueOnce(
      CreatedSaleMock as unknown as SaleEntity
    )
    findClientByIdRepository.findById.mockResolvedValueOnce(
      CreatedClientMock as unknown as ClientEntity
    )
    findVehicleByIdRepository.findById.mockResolvedValueOnce(
      CreatedVehicleMock as unknown as VehicleEntity
    )
    paymentExternalGateway.create.mockResolvedValueOnce({
      status: PaymentStatus.Approved,
      reason: null
    })
    createPaymentRepository.create.mockResolvedValueOnce(CreatedPaymentMock)

    const result: any = await createPaymentUC.execute(input)

    expect(createPaymentUC.execute).toBeInstanceOf(Function)
    expect(result).toEqual(CreatedPaymentMock)
  })

  it('should throw exception if the payment already exists', async () => {
    findPaymentByConditionRepository.findByCondition.mockResolvedValueOnce(
      CreatedPaymentMock
    )

    const httpException: HttpException = ConflictStub(Field.Payment)

    await expect(createPaymentUC.execute(input)).rejects.toThrow(httpException)
  })

  it('should throw exception if the sale not found', async () => {
    findPaymentByConditionRepository.findByCondition.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Sale)

    await expect(createPaymentUC.execute(input)).rejects.toThrow(httpException)
  })

  it('should throw exception if the client not found', async () => {
    findSaleByIdRepository.findById.mockResolvedValueOnce(
      CreatedSaleMock as unknown as SaleEntity
    )
    findClientByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Client)

    await expect(createPaymentUC.execute(input)).rejects.toThrow(httpException)
  })

  it('should throw exception if case the price diferents amount ', async () => {
    findSaleByIdRepository.findById.mockResolvedValueOnce(
      CreatedSaleMock as unknown as SaleEntity
    )
    findClientByIdRepository.findById.mockResolvedValueOnce(
      CreatedClientMock as unknown as ClientEntity
    )
    findVehicleByIdRepository.findById.mockResolvedValueOnce(
      CreatedVehicleMock as unknown as VehicleEntity
    )

    const httpException: HttpException = BadRequestStub(
      ErrorMessage.VehicleValue
    )

    await expect(
      createPaymentUC.execute({ ...input, amount: 1 })
    ).rejects.toThrow(httpException)
  })

  it('should throw exception if the sale not found', async () => {
    findVehicleByIdRepository.findById.mockResolvedValueOnce({
      ...CreatedVehicleMock,
      status: VehicleStatus.Sold
    } as unknown as VehicleEntity)

    const httpException: HttpException = NotFoundStub(Field.Sale)

    await expect(createPaymentUC.execute(input)).rejects.toThrow(httpException)
  })
})
