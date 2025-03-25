import {
  CreateVehicleRepository,
  FindVehicleByConditionRepository
} from '@application/repositories/vehicle'
import { CreateVehicleUC } from '@application/usecases/vehicle'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindVehicleByConditionPrismaRepository,
  CreateVehiclePrismaRepository
} from '@infrastructure/persistence/database/repositories/vehicle'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { CreateVehicleController } from '@presentation/controllers/vehicle'

export const CreateVehicleControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findVehicleByConditionRepository: FindVehicleByConditionRepository =
    new FindVehicleByConditionPrismaRepository(databaseConnection)
  const createVehicleRepository: CreateVehicleRepository =
    new CreateVehiclePrismaRepository(databaseConnection)
  const createVehicleUseCase: CreateVehicleUC = new CreateVehicleUC(
    findVehicleByConditionRepository,
    createVehicleRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const createVehicleController: CreateVehicleController =
    new CreateVehicleController(createVehicleUseCase, genericSucessPresenter)

  return {
    databaseConnection,
    findVehicleByConditionRepository,
    createVehicleRepository,
    createVehicleUseCase,
    createVehicleController
  }
}
