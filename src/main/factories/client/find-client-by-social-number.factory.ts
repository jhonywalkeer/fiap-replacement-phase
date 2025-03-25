import { FindClientBySocialNumberRepository } from '@application/repositories/client'
import { FindClientBySocialNumberUC } from '@application/usecases/client'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindClientBySocialNumberPrismaRepository } from '@infrastructure/persistence/database/repositories/client/find-client-by-social-number.prisma.repository'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { FindClientBySocialNumberController } from '@presentation/controllers/client'

export const FindClientBySocialNumberControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findClientBySocialNumberRepository: FindClientBySocialNumberRepository =
    new FindClientBySocialNumberPrismaRepository(databaseConnection)

  const findClientBySocialNumberUseCase: FindClientBySocialNumberUC =
    new FindClientBySocialNumberUC(findClientBySocialNumberRepository)
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const findClientBySocialNumberController: FindClientBySocialNumberController =
    new FindClientBySocialNumberController(
      findClientBySocialNumberUseCase,
      genericSucessPresenter
    )

  return {
    databaseConnection,
    findClientBySocialNumberRepository,
    findClientBySocialNumberUseCase,
    findClientBySocialNumberController
  }
}
