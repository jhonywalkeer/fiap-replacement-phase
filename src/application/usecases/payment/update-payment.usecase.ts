import {
  FindPaymentByIdRepository,
  UpdatePaymentRepository
} from '@application/repositories/payment'
import {
  FindSaleByIdRepository,
  UpdateSaleWithPaymentRepository
} from '@application/repositories/sale'
import { UpdateVehicleStatusRepository } from '@application/repositories/vehicle'
import { StatusCode } from '@common/enums'
import { NotFoundError } from '@common/errors'
import { PaymentWithSaleEntity, SaleEntity } from '@domain/entities'
import { Field, VehicleStatus } from '@domain/enums'
import { UpdatePayment } from '@domain/interfaces/payment'
import { UpdatePaymentUseCase } from '@domain/usecases/payment'
import { Logger } from '@infrastructure/logging'

export class UpdatePaymentUC implements UpdatePaymentUseCase {
  private readonly method: string = '[UpdatePaymentUC]'

  constructor(
    private readonly findPaymentById: FindPaymentByIdRepository,
    private readonly findSaleById: FindSaleByIdRepository,
    private readonly updatePayment: UpdatePaymentRepository,
    private readonly updateVehicle: UpdateVehicleStatusRepository,
    private readonly updateSale: UpdateSaleWithPaymentRepository
  ) {}

  async execute(payload: UpdatePayment): Promise<PaymentWithSaleEntity> {
    Logger.info(`${this.method}.execute`)

    const findPayment = await this.validatedPayment(payload.payment_id)
    const findSale = await this.validatedSale(findPayment.sale.id)
    const updatedPayment = await this.updatePayment.update({
      id: findPayment.id,
      sale_id: findSale.id,
      status: payload.status,
      reason: payload.reason
    })

    await this.updateVehicleStatus(findSale.vehicle_id)
    await this.updateSaleStatus(findSale.id, updatedPayment.id)

    return await this.validatedPayment(updatedPayment.id)
  }

  private async validatedPayment(id: string): Promise<PaymentWithSaleEntity> {
    const findPayment = await this.findPaymentById.findById({ id })
    return findPayment ?? this.notFoundHandler(Field.Payment)
  }

  private async validatedSale(id: string): Promise<SaleEntity> {
    const findSale = await this.findSaleById.findById({ id })
    return findSale ? findSale : this.notFoundHandler(Field.Sale)
  }

  private async updateVehicleStatus(vehicleId: string): Promise<void> {
    const updateVehicle = await this.updateVehicle.updateVehicleWithStatus({
      id: vehicleId,
      status: VehicleStatus.Sold
    })
    Logger.info(
      `${this.method} | Veículo ${updateVehicle?.id} vendido com sucesso`
    )
  }

  private async updateSaleStatus(
    saleId: string,
    paymentId: string
  ): Promise<void> {
    const updateSale = await this.updateSale.updateSaleWithPaymentId({
      id: saleId,
      payment_id: paymentId
    })
    Logger.info(`${this.method} | Status da venda ${updateSale?.id} atualizada`)
  }

  private async notFoundHandler(field: string): Promise<any> {
    Logger.error(`${this.method} | Status Code ${StatusCode.NotFound}`)
    throw new NotFoundError(field)
  }
}
