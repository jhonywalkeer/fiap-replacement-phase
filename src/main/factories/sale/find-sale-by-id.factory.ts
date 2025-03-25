import { FindSaleByIdRepository } from '@application/repositories/sale'
import { FindSaleByIdUC } from '@application/usecases/sale'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindSaleByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/sale'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { FindSaleByIdController } from '@presentation/controllers/sale'

export const FindSaleByIdControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findSaleByIdRepository: FindSaleByIdRepository =
    new FindSaleByIdPrismaRepository(databaseConnection)

  const findSaleByIdUseCase: FindSaleByIdUC = new FindSaleByIdUC(
    findSaleByIdRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const findSaleByIdController: FindSaleByIdController =
    new FindSaleByIdController(findSaleByIdUseCase, genericSucessPresenter)

  return {
    databaseConnection,
    findSaleByIdRepository,
    findSaleByIdUseCase,
    findSaleByIdController
  }
}
