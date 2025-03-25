import { CreateSaleRepository } from '@application/repositories/sale'
import { Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { SaleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateSale } from '@domain/interfaces/sale'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class CreateSalePrismaRepository implements CreateSaleRepository {
  private readonly method: string = '[CreateSalePrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(payload: CreateSale): Promise<SaleEntity> {
    try {
      const createSale = await this.prisma.sale.create({
        data: {
          ...payload
        }
      })
      return {
        ...createSale
      }
    } catch (error) {
      Logger.error(`${this.method} | ${error}`)
      throw new NotOccurredError(Operation.Create, Field.Sale)
    }
  }
}
