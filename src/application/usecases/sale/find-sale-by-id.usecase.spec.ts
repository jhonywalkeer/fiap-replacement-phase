import { FindSaleByIdRepository } from '@application/repositories/sale'
import { FindSaleByIdUC } from './find-sale-by-id.usecase'
import { IdentifierWithKeyMock } from '@mocks/common'
import { SaleEntity } from '@domain/entities'
import { FindedSaleByIdMock } from '@mocks/sale'
import { HttpException } from '@common/errors'
import { NotFoundStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'

describe('[Use Case] Find Sale By Id Use Case', () => {
  let findSaleByIdUC: FindSaleByIdUC
  let findSaleByIdRepository: jest.Mocked<FindSaleByIdRepository>

  const pathParameter = IdentifierWithKeyMock
  const sale = FindedSaleByIdMock as unknown as SaleEntity

  beforeEach(() => {
    findSaleByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindSaleByIdRepository>

    findSaleByIdUC = new FindSaleByIdUC(findSaleByIdRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return sale by id', async () => {
    findSaleByIdRepository.findById.mockResolvedValueOnce(sale)

    const result: SaleEntity = await findSaleByIdUC.execute(pathParameter)

    expect(findSaleByIdUC.execute).toBeInstanceOf(Function)
    expect(findSaleByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(result).toEqual(sale)
  })

  it('should throw exception if the not found sale', async () => {
    findSaleByIdRepository.findById.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Sale)

    expect(findSaleByIdUC.execute).toBeInstanceOf(Function)
    expect(findSaleByIdUC.execute(pathParameter)).rejects.toThrow(httpException)
  })
})
