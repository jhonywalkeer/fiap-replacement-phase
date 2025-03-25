import { FindVehicleByIdRepository } from '@application/repositories/vehicle'
import { FindVehicleByIdUC } from '@application/usecases/vehicle/find-vehicle-by-id.usecase'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindVehicleByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/vehicle'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { FindVehicleByIdController } from '@presentation/controllers/vehicle'

export const FindVehicleByIdControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findVehicleByIdRepository: FindVehicleByIdRepository =
    new FindVehicleByIdPrismaRepository(databaseConnection)

  const findVehicleByIdUseCase: FindVehicleByIdUC = new FindVehicleByIdUC(
    findVehicleByIdRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const findVehicleByIdController: FindVehicleByIdController =
    new FindVehicleByIdController(
      findVehicleByIdUseCase,
      genericSucessPresenter
    )

  return {
    databaseConnection,
    findVehicleByIdRepository,
    findVehicleByIdUseCase,
    findVehicleByIdController
  }
}
