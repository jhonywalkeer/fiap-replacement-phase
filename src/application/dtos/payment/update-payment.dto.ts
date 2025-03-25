export class UpdatePaymentDTO {
  payment_id: string
  status: string
  reason: string

  constructor(payment_id: string, status: string, reason: string) {
    this.payment_id = payment_id
    this.status = status
    this.reason = reason
  }
}
