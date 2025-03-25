import {
  DeleteVehicleRepository,
  FindVehicleByIdRepository
} from '@application/repositories/vehicle'
import { DeleteVehicleUC } from '@application/usecases/vehicle/delete-vehicle.usecase'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindVehicleByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/vehicle'
import { DeleteVehiclePrismaRepository } from '@infrastructure/persistence/database/repositories/vehicle'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { DeleteVehicleController } from '@presentation/controllers/vehicle'

export const DeleteVehicleControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findVehicleByIdRepository: FindVehicleByIdRepository =
    new FindVehicleByIdPrismaRepository(databaseConnection)
  const deleteVehicleRepository: DeleteVehicleRepository =
    new DeleteVehiclePrismaRepository(databaseConnection)
  const deleteVehicleUseCase: DeleteVehicleUC = new DeleteVehicleUC(
    findVehicleByIdRepository,
    deleteVehicleRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const deleteVehicleController: DeleteVehicleController =
    new DeleteVehicleController(deleteVehicleUseCase, genericSucessPresenter)

  return {
    findVehicleByIdRepository,
    deleteVehicleRepository,
    deleteVehicleUseCase,
    deleteVehicleController
  }
}
