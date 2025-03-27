import {
  FindPaymentByIdRepository,
  UpdatePaymentRepository
} from '@application/repositories/payment'
import { FindSaleByIdRepository } from '@application/repositories/sale'
import { UpdatePaymentUC } from './update-payment.usecase'
import { PaymentWithSaleEntity, SaleEntity } from '@domain/entities'
import { FindedPaymentWithSaleMock, UpdatePaymentMock } from '@mocks/payment'
import { FindedSaleByIdMock } from '@mocks/sale'
import { HttpException } from '@common/errors'
import { NotFoundStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'

describe('[Use Case] Update Payment By Id Use Case', () => {
  let updatePaymentUC: UpdatePaymentUC
  let findPaymentByIdRepository: jest.Mocked<FindPaymentByIdRepository>
  let findSaleByIdRepository: jest.Mocked<FindSaleByIdRepository>
  let updatePaymentRepository: jest.Mocked<UpdatePaymentRepository>

  beforeEach(() => {
    findPaymentByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindPaymentByIdRepository>

    findSaleByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindSaleByIdRepository>

    updatePaymentRepository = {
      update: jest.fn()
    } as unknown as jest.Mocked<UpdatePaymentRepository>

    updatePaymentUC = new UpdatePaymentUC(
      findPaymentByIdRepository,
      findSaleByIdRepository,
      updatePaymentRepository
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw exception if the not found payment', async () => {
    findPaymentByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Payment)

    expect(updatePaymentUC.execute).toBeInstanceOf(Function)
    expect(updatePaymentUC.execute(UpdatePaymentMock as any)).rejects.toThrow(
      httpException
    )
  })

  it('should throw exception if the not found sale', async () => {
    findPaymentByIdRepository.findById.mockResolvedValueOnce(
      FindedPaymentWithSaleMock as unknown as PaymentWithSaleEntity
    )
    findSaleByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Sale)

    expect(updatePaymentUC.execute).toBeInstanceOf(Function)
    expect(updatePaymentUC.execute(UpdatePaymentMock as any)).rejects.toThrow(
      httpException
    )
  })

  it('should throw exception if update fails', async () => {
    findPaymentByIdRepository.findById.mockResolvedValueOnce(
      FindedPaymentWithSaleMock as unknown as PaymentWithSaleEntity
    )
    findSaleByIdRepository.findById.mockResolvedValueOnce(
      FindedSaleByIdMock as unknown as SaleEntity
    )
    updatePaymentRepository.update.mockRejectedValueOnce(
      new Error('Update failed')
    )

    await expect(
      updatePaymentUC.execute(UpdatePaymentMock as any)
    ).rejects.toThrow('Update failed')
  })
})
