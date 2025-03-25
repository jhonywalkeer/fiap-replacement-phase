import { UpdatePaymentRepository } from '@application/repositories/payment'
import { Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaymentEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdatePayment } from '@domain/interfaces/payment'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class UpdatePaymentPrismaRepository implements UpdatePaymentRepository {
  private readonly method: string = '[UpdatePaymentPrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async update(payload: UpdatePayment): Promise<PaymentEntity> {
    try {
      const updateVehicle = await this.prisma.payment.update({
        where: { id: payload.payment_id },
        data: {
          status: payload.status,
          reason: payload.reason
        }
      })
      return updateVehicle as unknown as PaymentEntity
    } catch (error) {
      Logger.error(`${this.method} | ${error}`)
      throw new NotOccurredError(Operation.Create, Field.Vehicle)
    }
  }
}
