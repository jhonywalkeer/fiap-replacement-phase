import { FindAllSalesRepository } from '@application/repositories/sale'
import { DatabaseConnection } from '../../database-connection'
import { PaginationAndFilter } from '@common/interfaces'
import { SaleEntity } from '@domain/entities'
import { Logger } from '@infrastructure/logging'
import { Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'
import { FindAllSalesQuery } from '../../queries/sale'

export class FindAllSalesPrismaRepository implements FindAllSalesRepository {
  private readonly method: string = '[FindAllSalesPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    parameters: PaginationAndFilter
  ): Promise<[SaleEntity, number] | null> {
    try {
      const { condition } = FindAllSalesQuery(parameters)
      const findSales = await this.prisma.sale.findMany(condition)
      const countSales = await this.prisma.sale.count()

      return !findSales || findSales.length === 0
        ? null
        : [findSales as unknown as SaleEntity, countSales]
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Vehicle)
    }
  }
}
