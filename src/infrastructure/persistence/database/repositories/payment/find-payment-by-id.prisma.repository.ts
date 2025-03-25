import { PaymentWithSaleMap } from '@application/mappers/payment'
import { FindPaymentByIdRepository } from '@application/repositories/payment'
import { StatusCode, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'
import { Sale } from '@domain/interfaces'
import { FindPaymentById, Payment } from '@domain/interfaces/payment'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindPaymentByIdQuery } from '@infrastructure/persistence/database/queries'
import { PaymentWithSaleEntity } from '@domain/entities'

export class FindPaymentByIdPrismaRepository
  implements FindPaymentByIdRepository
{
  private readonly method: string = '[FindPaymentByIdPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(
    parameter: FindPaymentById
  ): Promise<PaymentWithSaleEntity | null> {
    try {
      const findPayment = await this.prisma.payment.findUnique(
        FindPaymentByIdQuery(parameter)
      )

      return !findPayment
        ? null
        : PaymentWithSaleMap.execute(
            findPayment as unknown as Payment & Sale,
            findPayment.sale as unknown as Sale
          )
    } catch (error) {
      Logger.error(
        `${this.method} Status Code ${StatusCode.InternalServer} | ${error}`
      )
      throw new NotOccurredError(Operation.Find, Field.Vehicle)
    }
  }
}
