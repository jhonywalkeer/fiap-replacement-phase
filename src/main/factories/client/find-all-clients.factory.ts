import { FindAllClientsRepository } from '@application/repositories/client'
import { FindAllClientsUC } from '@application/usecases/client'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllClientsPrismaRepository } from '@infrastructure/persistence/database/repositories/client'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { FindAllClientsController } from '@presentation/controllers/client'

export const FindAllClientsControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findAllClientsRepository: FindAllClientsRepository =
    new FindAllClientsPrismaRepository(databaseConnection)

  const findAllClientsUseCase: FindAllClientsUC = new FindAllClientsUC(
    findAllClientsRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const findAllClientController: FindAllClientsController =
    new FindAllClientsController(findAllClientsUseCase, genericSucessPresenter)

  return {
    databaseConnection,
    findAllClientsRepository,
    findAllClientsUseCase,
    findAllClientController
  }
}
