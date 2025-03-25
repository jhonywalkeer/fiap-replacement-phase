import { CreatePaymentRepository } from '@application/repositories/payment'
import { Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Field } from '@domain/enums'
import { CreatePayment } from '@domain/interfaces/payment'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreatePaymentQuery } from '@infrastructure/persistence/database/queries'

export class CreatePaymentPrismaRepository implements CreatePaymentRepository {
  private readonly method: string = '[CreatePaymentPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(payload: CreatePayment): Promise<any> {
    try {
      const createPayment = await this.prisma.payment.create(
        CreatePaymentQuery(payload)
      )
      return createPayment
    } catch (error) {
      Logger.error(`${this.method} | ${error}`)
      throw new NotOccurredError(Operation.Create, Field.Sale)
    }
  }
}
