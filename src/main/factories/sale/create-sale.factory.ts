import {
  CreateSaleRepository,
  FindSaleByConditionRepository
} from '@application/repositories/sale'
import {
  FindVehicleByIdRepository,
  UpdateVehicleRepository
} from '@application/repositories/vehicle'
import { CreateSaleUC } from '@application/usecases/sale'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateSalePrismaRepository,
  FindSaleByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/sale'
import {
  FindVehicleByIdPrismaRepository,
  UpdateVehiclePrismaRepository
} from '@infrastructure/persistence/database/repositories/vehicle'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { CreateSaleController } from '@presentation/controllers/sale'

export const CreateSaleControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findSaleByConditionRepository: FindSaleByConditionRepository =
    new FindSaleByConditionPrismaRepository(databaseConnection)
  const findVehicleByIdRepository: FindVehicleByIdRepository =
    new FindVehicleByIdPrismaRepository(databaseConnection)
  const updateVehicleRepository: UpdateVehicleRepository =
    new UpdateVehiclePrismaRepository(databaseConnection)
  const createSaleRepository: CreateSaleRepository =
    new CreateSalePrismaRepository(databaseConnection)
  const createSaleUseCase: CreateSaleUC = new CreateSaleUC(
    findSaleByConditionRepository,
    findVehicleByIdRepository,
    updateVehicleRepository,
    createSaleRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const createSaleController: CreateSaleController = new CreateSaleController(
    createSaleUseCase,
    genericSucessPresenter
  )

  return {
    findSaleByConditionRepository,
    createSaleRepository,
    createSaleUseCase,
    createSaleController
  }
}
