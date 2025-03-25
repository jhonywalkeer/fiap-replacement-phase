import { PaymentWithSaleEntity } from '@domain/entities'

export interface UpdatePaymentUseCase {
  execute(payload: any): Promise<PaymentWithSaleEntity> | never
}
