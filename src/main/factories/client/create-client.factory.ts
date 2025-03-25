import {
  CreateClientRepository,
  FindClientByConditionRepository
} from '@application/repositories/client'
import { CreateClientUC } from '@application/usecases/client'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateClientPrismaRepository,
  FindClientByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/client'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { CreateClientController } from '@presentation/controllers/client'

export const CreateClientControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findClientByConditionRepository: FindClientByConditionRepository =
    new FindClientByConditionPrismaRepository(databaseConnection)
  const createClientRepository: CreateClientRepository =
    new CreateClientPrismaRepository(databaseConnection)
  const createClientUseCase: CreateClientUC = new CreateClientUC(
    findClientByConditionRepository,
    createClientRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const createClientController: CreateClientController =
    new CreateClientController(createClientUseCase, genericSucessPresenter)

  return {
    findClientByConditionRepository,
    createClientRepository,
    createClientUseCase,
    createClientController
  }
}
