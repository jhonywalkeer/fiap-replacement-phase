import {
  DeleteClientRepository,
  FindClientByIdRepository
} from '@application/repositories/client'
import { FindSaleByConditionRepository } from '@application/repositories/sale'
import { DeleteClientUC } from '@application/usecases/client'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindClientByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/client'
import { DeleteClientPrismaRepository } from '@infrastructure/persistence/database/repositories/client'
import { FindSaleByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/sale'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { DeleteClientController } from '@presentation/controllers/client'

export const DeleteClientControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findClientByIdRepository: FindClientByIdRepository =
    new FindClientByIdPrismaRepository(databaseConnection)
  const findSaleByClientRepository: FindSaleByConditionRepository =
    new FindSaleByConditionPrismaRepository(databaseConnection)
  const deleteClientRepository: DeleteClientRepository =
    new DeleteClientPrismaRepository(databaseConnection)
  const deleteClientUseCase: DeleteClientUC = new DeleteClientUC(
    findClientByIdRepository,
    findSaleByClientRepository,
    deleteClientRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const deleteClientController: DeleteClientController =
    new DeleteClientController(deleteClientUseCase, genericSucessPresenter)

  return {
    findClientByIdRepository,
    deleteClientRepository,
    deleteClientUseCase,
    deleteClientController
  }
}
