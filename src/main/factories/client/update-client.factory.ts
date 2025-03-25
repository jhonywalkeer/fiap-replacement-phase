import {
  FindClientByIdRepository,
  UpdateClientRepository
} from '@application/repositories/client'
import { UpdateClientUC } from '@application/usecases/client'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindClientByIdPrismaRepository,
  UpdateClientPrismaRepository
} from '@infrastructure/persistence/database/repositories/client'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { UpdateClientController } from '@presentation/controllers/client'

export const UpdateClientControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findClientByIdRepository: FindClientByIdRepository =
    new FindClientByIdPrismaRepository(databaseConnection)
  const updateClientRepository: UpdateClientRepository =
    new UpdateClientPrismaRepository(databaseConnection)
  const updateClientUseCase: UpdateClientUC = new UpdateClientUC(
    findClientByIdRepository,
    updateClientRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const updateClientController: UpdateClientController =
    new UpdateClientController(updateClientUseCase, genericSucessPresenter)

  return {
    findClientByIdRepository,
    updateClientRepository,
    updateClientUseCase,
    updateClientController
  }
}
