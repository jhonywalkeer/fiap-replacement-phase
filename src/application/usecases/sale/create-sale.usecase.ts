import { CreateSaleUseCase } from '@domain/usecases/sale'
import { CreateSale } from '@domain/interfaces/sale'
import { Logger } from '@infrastructure/logging'
import { Field, VehicleStatus } from '@domain/enums'
import {
  CreateSaleRepository,
  FindSaleByConditionRepository
} from '@application/repositories/sale'
import { SaleEntity, VehicleEntity } from '@domain/entities'
import { ConflictError, NotFoundError } from '@common/errors'
import {
  FindVehicleByIdRepository,
  UpdateVehicleRepository
} from '@application/repositories/vehicle'
import { StatusCode } from '@common/enums'

export class CreateSaleUC implements CreateSaleUseCase {
  private readonly method: string = '[CreateSaleUC]'

  constructor(
    private readonly findSaleByCondition: FindSaleByConditionRepository,
    private readonly findVehicleById: FindVehicleByIdRepository,
    private readonly updateVehicle: UpdateVehicleRepository,
    private readonly createSale: CreateSaleRepository
  ) {}

  async execute(payload: CreateSale): Promise<SaleEntity> {
    Logger.info(`${this.method}.execute`)

    await this.validatedVehicle(payload.vehicle_id)
    await this.validatedSale(payload)

    const sale = await this.createSale.create(payload)

    await this.updateVehicle.update({
      id: payload.vehicle_id,
      sale_id: sale.id,
      status: VehicleStatus.Reserved
    })

    return await this.createSale.create(payload)
  }

  private async validatedVehicle(id: string): Promise<VehicleEntity> {
    const vehicle: VehicleEntity | null = await this.findVehicleById.findById({
      id
    })
    return !vehicle ? this.notFoundHandler(Field.Vehicle) : vehicle
  }

  private async validatedSale(payload: CreateSale): Promise<SaleEntity> {
    const sale: SaleEntity | null =
      await this.findSaleByCondition.findByCondition(payload)

    return sale ? this.conflictHandler(Field.Sale) : sale
  }

  private notFoundHandler(field: string): Promise<any> {
    Logger.error(`${this.method} | Status Code ${StatusCode.NotFound}`)
    throw new NotFoundError(field)
  }

  private async conflictHandler(field: string): Promise<any> {
    Logger.error(`${this.method} | Status Code ${StatusCode.Conflict}`)
    throw new ConflictError(field)
  }
}
