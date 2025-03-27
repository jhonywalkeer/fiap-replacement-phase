import { FindPaymentByIdRepository } from '@application/repositories/payment'
import { FindPaymentByIdUC } from './find-payment-by-id.usecase'
import { IdentifierWithKeyMock } from '@mocks/common'
import { FindedPaymentWithSaleMock } from '@mocks/payment'
import { PaymentWithSaleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { NotFoundStub } from '@stubs/exceptions'
import { HttpException } from '@common/errors'

describe('[Use Case] Find Payment By Id Use Case', () => {
  let findPaymentByIdUC: FindPaymentByIdUC
  let findPaymentByIdRepository: jest.Mocked<FindPaymentByIdRepository>

  const pathParameter = IdentifierWithKeyMock
  const payment = FindedPaymentWithSaleMock as unknown as PaymentWithSaleEntity

  beforeEach(() => {
    findPaymentByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindPaymentByIdRepository>

    findPaymentByIdUC = new FindPaymentByIdUC(findPaymentByIdRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return payment by id', async () => {
    findPaymentByIdRepository.findById.mockResolvedValueOnce(payment)

    const result: PaymentWithSaleEntity =
      await findPaymentByIdUC.execute(pathParameter)

    expect(findPaymentByIdUC.execute).toBeInstanceOf(Function)
    expect(findPaymentByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(result).toEqual(payment)
  })

  it('should throw exception if the not found payment', async () => {
    findPaymentByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Payment)

    expect(findPaymentByIdUC.execute).toBeInstanceOf(Function)
    expect(findPaymentByIdUC.execute(pathParameter)).rejects.toThrow(
      httpException
    )
  })
})
