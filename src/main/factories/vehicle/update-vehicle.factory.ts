import {
  UpdateVehicleRepository,
  FindVehicleByIdRepository
} from '@application/repositories/vehicle'
import { UpdateVehicleUC } from '@application/usecases/vehicle'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindVehicleByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/vehicle'
import { UpdateVehiclePrismaRepository } from '@infrastructure/persistence/database/repositories/vehicle'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { UpdateVehicleController } from '@presentation/controllers/vehicle'

export const UpdateVehicleControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findVehicleByIdRepository: FindVehicleByIdRepository =
    new FindVehicleByIdPrismaRepository(databaseConnection)
  const updateVehicleRepository: UpdateVehicleRepository =
    new UpdateVehiclePrismaRepository(databaseConnection)
  const updateVehicleUseCase: UpdateVehicleUC = new UpdateVehicleUC(
    findVehicleByIdRepository,
    updateVehicleRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const updateVehicleController: UpdateVehicleController =
    new UpdateVehicleController(updateVehicleUseCase, genericSucessPresenter)

  return {
    findVehicleByIdRepository,
    updateVehicleRepository,
    updateVehicleUseCase,
    updateVehicleController
  }
}
