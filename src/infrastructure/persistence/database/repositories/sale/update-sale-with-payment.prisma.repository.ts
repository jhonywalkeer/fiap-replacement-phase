import { UpdateSaleWithPaymentRepository } from '@application/repositories/sale'
import { Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { SaleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateSaleWithPaymentId } from '@domain/interfaces/sale'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class UpdateSaleWithPaymentPrismaRepository
  implements UpdateSaleWithPaymentRepository
{
  private readonly method: string = '[UpdateSaleWithPaymentPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async updateSaleWithPaymentId(
    payload: UpdateSaleWithPaymentId
  ): Promise<SaleEntity> {
    try {
      const updateSale = await this.prisma.sale.update({
        where: {
          id: payload.id
        },
        data: {
          payment_id: payload.payment_id
        }
      })
      return updateSale as unknown as SaleEntity
    } catch (error) {
      Logger.error(`${this.method} | ${error}`)
      throw new NotOccurredError(Operation.Create, Field.Vehicle)
    }
  }
}
