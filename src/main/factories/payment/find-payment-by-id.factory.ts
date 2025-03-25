import { FindPaymentByIdRepository } from '@application/repositories/payment'
import { FindPaymentByIdUC } from '@application/usecases/payment'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindPaymentByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/payment'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { FindPaymentByIdController } from '@presentation/controllers/payment'

export const FindPaymentByIdControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findPaymentByIdRepository: FindPaymentByIdRepository =
    new FindPaymentByIdPrismaRepository(databaseConnection)

  const findPaymentByIdUseCase: FindPaymentByIdUC = new FindPaymentByIdUC(
    findPaymentByIdRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const findPaymentByIdController: FindPaymentByIdController =
    new FindPaymentByIdController(
      findPaymentByIdUseCase,
      genericSucessPresenter
    )

  return {
    databaseConnection,
    findPaymentByIdRepository,
    findPaymentByIdUseCase,
    findPaymentByIdController
  }
}
