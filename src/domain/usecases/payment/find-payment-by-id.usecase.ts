import { PaymentWithSaleEntity } from '@domain/entities'
import { FindPaymentById } from '@domain/interfaces/payment'

export interface FindPaymentByIdUseCase {
  execute(payload: FindPaymentById): Promise<PaymentWithSaleEntity> | never
}
