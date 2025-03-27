import { FindClientByIdRepository } from '@application/repositories/client'
import {
  CreatePaymentRepository,
  FindPaymentByConditionRepository
} from '@application/repositories/payment'
import { FindSaleByIdRepository } from '@application/repositories/sale'
import { UpdateSaleWithPaymentRepository } from '@application/repositories/sale/update-sale-with-payment-id.repository'
import { FindVehicleByIdRepository } from '@application/repositories/vehicle'
import { UpdateVehicleStatusRepository } from '@application/repositories/vehicle/update-vehicle-with-status.repository'
import { ErrorMessage, StatusCode } from '@common/enums'
import { BadRequestError, ConflictError, NotFoundError } from '@common/errors'
import {
  ClientEntity,
  PaymentEntity,
  SaleEntity,
  VehicleEntity
} from '@domain/entities'
import { Field, VehicleStatus } from '@domain/enums'
import { CardPayment, CreatePayment } from '@domain/interfaces'
import { CreatePaymentUseCase } from '@domain/usecases/payment'
import { PaymentExternalGateway } from '@infrastructure/gateways/payment'
import { Logger } from '@infrastructure/logging'

export class CreatePaymentUC implements CreatePaymentUseCase {
  private readonly method: string = '[CreatePaymentUC]'

  constructor(
    private readonly findPaymentByCondition: FindPaymentByConditionRepository,
    private readonly findSaleById: FindSaleByIdRepository,
    private readonly findClientById: FindClientByIdRepository,
    private readonly findVehicleById: FindVehicleByIdRepository,
    private readonly createPayment: CreatePaymentRepository,
    private readonly gateway: PaymentExternalGateway,
    private readonly updateVehicle: UpdateVehicleStatusRepository,
    private readonly updateSale: UpdateSaleWithPaymentRepository
  ) {}

  async execute(payload: CreatePayment): Promise<any> {
    Logger.info(`${this.method}.execute`)
    await this.validatedPayment(payload)

    const sale: SaleEntity = await this.validatedSale(payload.sale_id)
    const client: ClientEntity = await this.validatedClient(sale.buyer_id)
    const vehicle: VehicleEntity = await this.validatedVehicle(
      sale.vehicle_id,
      payload.amount
    )
    const vehicleDescription: string = `${vehicle.brand} ${vehicle.model} ${vehicle.fuel} ${vehicle.year} ${vehicle.color}`
    const payment = PaymentEntity.create({
      sale_id: payload.sale_id,
      amount: payload.amount,
      method: payload.payment_method
    })
    const externalPayment = await this.gateway.create({
      payer: {
        mail: client.mail,
        security_social_number: client.social_security_number
      },
      description: vehicleDescription,
      amount: payment.amount,
      method: payment.method,
      card: payload.card as unknown as CardPayment
    })
    const paymentCreated = await this.createPayment.create({
      sale_id: payment.sale_id,
      amount: payment.amount,
      payment_method: payment.method,
      status: externalPayment.status,
      reason: externalPayment.reason
    })
    await this.updateVehicleStatus(vehicle.id)
    await this.updateSaleStatus(sale.id, paymentCreated.id)

    return paymentCreated
  }

  private async validatedPayment(
    payload: CreatePayment
  ): Promise<PaymentEntity | null> {
    const findPayment = await this.findPaymentByCondition.findByCondition({
      sale_id: payload.sale_id,
      amount: payload.amount,
      method: payload.payment_method
    })
    return findPayment ? this.conflictHandler(Field.Payment) : null
  }

  private async validatedSale(sale_id: string): Promise<SaleEntity> {
    const findSale = await this.findSaleById.findById({ id: sale_id })
    return !findSale ? this.notFoundHandler(Field.Sale) : findSale
  }

  private async validatedClient(client_id: string): Promise<ClientEntity> {
    const findClient = await this.findClientById.findById({ id: client_id })
    return !findClient ? this.notFoundHandler(Field.Client) : findClient
  }

  private async validatedVehicle(
    vehicle_id: string,
    amount: number
  ): Promise<VehicleEntity> {
    const findVehicle = await this.findVehicleById.findById({ id: vehicle_id })
    const vehicleAvailable =
      findVehicle && findVehicle.status !== VehicleStatus.Sold

    if (findVehicle?.price !== undefined && +findVehicle.price !== amount) {
      await this.badRequestHandler(ErrorMessage.VehicleValue)
    }

    return !findVehicle && !vehicleAvailable
      ? this.notFoundHandler(Field.Vehicle)
      : findVehicle
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

  private async badRequestHandler(message: string): Promise<any> {
    Logger.error(`${this.method} | Status Code ${StatusCode.BadRequest}`)
    throw new BadRequestError(message)
  }

  private async notFoundHandler(field: string): Promise<any> {
    Logger.error(`${this.method} | Status Code ${StatusCode.NotFound}`)
    throw new NotFoundError(field)
  }

  private async conflictHandler(field: string): Promise<any> {
    Logger.error(`${this.method} | Status Code ${StatusCode.Conflict}`)
    throw new ConflictError(field)
  }
}
