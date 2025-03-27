import { FindAllSalesRepository } from '@application/repositories/sale'
import { FindAllSalesUC } from './find-all-sales.usecase'
import { PaginationAndFilter } from '@common/interfaces'
import { Pagination } from '@common/constants'
import { FindAllSalesMock } from '@mocks/sale'
import { SaleEntity } from '@domain/entities'
import { HttpException } from '@common/errors'
import { NotFoundStub } from '@stubs/exceptions'
import { Field } from '@domain/enums'

describe('[Use Case] Find All Sales Use Case', () => {
  let findAllSalesUC: FindAllSalesUC
  let findAllSalesRepository: jest.Mocked<FindAllSalesRepository>

  const queryParameters: PaginationAndFilter = {
    page: Pagination.Default.Page,
    limit: Pagination.Default.Limit
  }
  const sales = FindAllSalesMock as unknown as [SaleEntity, number]

  beforeEach(() => {
    findAllSalesRepository = {
      findAll: jest.fn()
    } as unknown as jest.Mocked<FindAllSalesRepository>

    findAllSalesUC = new FindAllSalesUC(findAllSalesRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all clients', async () => {
    findAllSalesRepository.findAll.mockResolvedValueOnce(sales)

    const result: [SaleEntity, number] =
      await findAllSalesUC.execute(queryParameters)

    expect(findAllSalesUC.execute).toBeInstanceOf(Function)
    expect(findAllSalesRepository.findAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual(sales)
  })

  it('should throw exception if the not found sales', async () => {
    findAllSalesRepository.findAll.mockResolvedValueOnce(null)

    const httpException: HttpException = NotFoundStub(Field.Sale)

    expect(findAllSalesUC.execute).toBeInstanceOf(Function)
    expect(findAllSalesUC.execute(queryParameters)).rejects.toThrow(
      httpException
    )
  })
})
