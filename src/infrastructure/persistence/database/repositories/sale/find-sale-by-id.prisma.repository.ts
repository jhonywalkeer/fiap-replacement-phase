import { FindSaleByIdRepository } from '@application/repositories/sale'
import { StatusCode, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { SaleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindSaleById } from '@domain/interfaces/sale'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindSaleByIdPrismaRepository implements FindSaleByIdRepository {
  private readonly method: string = '[FindSaleByIdPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(parameter: FindSaleById): Promise<SaleEntity | null> {
    try {
      const findSale = await this.prisma.sale.findUnique({
        where: { id: parameter.id }
      })
      return findSale
        ? {
            ...findSale
          }
        : null
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Sale)
    }
  }
}
