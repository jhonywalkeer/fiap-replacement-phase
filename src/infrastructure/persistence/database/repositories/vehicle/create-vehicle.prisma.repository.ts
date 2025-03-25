import { CreateVehicleRepository } from '@application/repositories/vehicle'
import { Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { VehicleEntity } from '@domain/entities'
import { Field, Fuel, VehicleStatus } from '@domain/enums'
import { CreateVehicle } from '@domain/interfaces/vehicle'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateVehiclesQuery } from '@infrastructure/persistence/database/queries'

export class CreateVehiclePrismaRepository implements CreateVehicleRepository {
  private readonly method: string = '[CreateVehiclePrismaRepository]'
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(payload: CreateVehicle): Promise<VehicleEntity> {
    try {
      const createVehicle = await this.prisma.vehicle.create(
        CreateVehiclesQuery(payload)
      )
      return {
        ...createVehicle,
        price: createVehicle.price as any,
        status: createVehicle.status as VehicleStatus,
        fuel: createVehicle.fuel as Fuel
      }
    } catch (error) {
      Logger.error(`${this.method} | ${error}`)
      throw new NotOccurredError(Operation.Create, Field.Vehicle)
    }
  }
}
