import {
  FindPaymentByIdRepository,
  UpdatePaymentRepository
} from '@application/repositories/payment'
import {
  FindSaleByIdRepository,
  UpdateSaleWithPaymentRepository
} from '@application/repositories/sale'
import { UpdateVehicleStatusRepository } from '@application/repositories/vehicle'
import { UpdatePaymentUC } from '@application/usecases/payment'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindPaymentByIdPrismaRepository,
  UpdatePaymentPrismaRepository
} from '@infrastructure/persistence/database/repositories/payment'
import {
  FindSaleByIdPrismaRepository,
  UpdateSaleWithPaymentPrismaRepository
} from '@infrastructure/persistence/database/repositories/sale'
import { UpdateVehicleStatusPrismaRepository } from '@infrastructure/persistence/database/repositories/vehicle'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { UpdatePaymentWebhookController } from '@presentation/controllers/payment'

export const UpdatePaymentWebhookControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findPaymentByIdRepository: FindPaymentByIdRepository =
    new FindPaymentByIdPrismaRepository(databaseConnection)
  const findSaleByIdRepository: FindSaleByIdRepository =
    new FindSaleByIdPrismaRepository(databaseConnection)
  const updatePaymentRepository: UpdatePaymentRepository =
    new UpdatePaymentPrismaRepository(databaseConnection)
  const updateVehicleStatusRepository: UpdateVehicleStatusRepository =
    new UpdateVehicleStatusPrismaRepository(databaseConnection)
  const updateSaleWithPaymentRepository: UpdateSaleWithPaymentRepository =
    new UpdateSaleWithPaymentPrismaRepository(databaseConnection)
  const updatePaymentUseCase: UpdatePaymentUC = new UpdatePaymentUC(
    findPaymentByIdRepository,
    findSaleByIdRepository,
    updatePaymentRepository,
    updateVehicleStatusRepository,
    updateSaleWithPaymentRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const updatePaymentWebhookController: UpdatePaymentWebhookController =
    new UpdatePaymentWebhookController(
      updatePaymentUseCase,
      genericSucessPresenter
    )

  return {
    databaseConnection,
    findPaymentByIdRepository,
    updatePaymentUseCase,
    updatePaymentWebhookController
  }
}
