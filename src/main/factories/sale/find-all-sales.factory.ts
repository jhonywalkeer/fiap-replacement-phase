import { FindAllSalesRepository } from '@application/repositories/sale'
import { FindAllSalesUC } from '@application/usecases/sale'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllSalesPrismaRepository } from '@infrastructure/persistence/database/repositories/sale'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { FindAllSalesController } from '@presentation/controllers/sale'

export const FindAllSalesControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findAllSalesRepository: FindAllSalesRepository =
    new FindAllSalesPrismaRepository(databaseConnection)

  const findAllSalesUseCase: FindAllSalesUC = new FindAllSalesUC(
    findAllSalesRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const findAllSalesController: FindAllSalesController =
    new FindAllSalesController(findAllSalesUseCase, genericSucessPresenter)

  return {
    databaseConnection,
    findAllSalesRepository,
    findAllSalesUseCase,
    findAllSalesController
  }
}
