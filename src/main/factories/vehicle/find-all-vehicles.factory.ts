import { FindAllVehiclesRepository } from '@application/repositories/vehicle'
import { FindAllVehiclesUC } from '@application/usecases/vehicle'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllVehiclePrismaRepository } from '@infrastructure/persistence/database/repositories/vehicle'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { FindAllVehicleController } from '@presentation/controllers/vehicle'

export const FindAllVehiclesControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const FindAllVehiclesRepository: FindAllVehiclesRepository =
    new FindAllVehiclePrismaRepository(databaseConnection)

  const FindAllVehiclesUseCase: FindAllVehiclesUC = new FindAllVehiclesUC(
    FindAllVehiclesRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const findAllVehicleController: FindAllVehicleController =
    new FindAllVehicleController(FindAllVehiclesUseCase, genericSucessPresenter)

  return {
    databaseConnection,
    FindAllVehiclesRepository,
    FindAllVehiclesUseCase,
    findAllVehicleController
  }
}
