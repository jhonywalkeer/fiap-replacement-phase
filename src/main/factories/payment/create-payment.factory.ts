import { FindClientByIdRepository } from '@application/repositories/client'
import {
  CreatePaymentRepository,
  FindPaymentByConditionRepository
} from '@application/repositories/payment'
import {
  FindSaleByIdRepository,
  UpdateSaleWithPaymentRepository
} from '@application/repositories/sale'
import {
  FindVehicleByIdRepository,
  UpdateVehicleStatusRepository
} from '@application/repositories/vehicle'
import { CreatePaymentUC } from '@application/usecases/payment'
import { PaymentExternal } from '@infrastructure/gateways/payment'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindClientByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/client'
import {
  CreatePaymentPrismaRepository,
  FindPaymentByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/payment'
import {
  FindSaleByIdPrismaRepository,
  UpdateSaleWithPaymentPrismaRepository
} from '@infrastructure/persistence/database/repositories/sale'
import {
  FindVehicleByIdPrismaRepository,
  UpdateVehicleStatusPrismaRepository
} from '@infrastructure/persistence/database/repositories/vehicle'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { CreatePaymentController } from '@presentation/controllers/payment'

export const CreatePaymentControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findPaymentByConditionRepository: FindPaymentByConditionRepository =
    new FindPaymentByConditionPrismaRepository(databaseConnection)
  const findSaleByIdRepository: FindSaleByIdRepository =
    new FindSaleByIdPrismaRepository(databaseConnection)
  const findClientByIdRepository: FindClientByIdRepository =
    new FindClientByIdPrismaRepository(databaseConnection)
  const findVehicleByIdRepository: FindVehicleByIdRepository =
    new FindVehicleByIdPrismaRepository(databaseConnection)
  const createPaymentRepository: CreatePaymentRepository =
    new CreatePaymentPrismaRepository(databaseConnection)
  const updateVehicleStatusRepository: UpdateVehicleStatusRepository =
    new UpdateVehicleStatusPrismaRepository(databaseConnection)
  const updateSaleWithPaymentRepository: UpdateSaleWithPaymentRepository =
    new UpdateSaleWithPaymentPrismaRepository(databaseConnection)
  const gateway = new PaymentExternal()
  const createPaymentUseCase: CreatePaymentUC = new CreatePaymentUC(
    findPaymentByConditionRepository,
    findSaleByIdRepository,
    findClientByIdRepository,
    findVehicleByIdRepository,
    createPaymentRepository,
    gateway,
    updateVehicleStatusRepository,
    updateSaleWithPaymentRepository
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<any> =
    new HttpGenericResponseAdapter<any>()
  const createPaymentController: CreatePaymentController =
    new CreatePaymentController(createPaymentUseCase, genericSucessPresenter)

  return {
    findSaleByIdRepository,
    findClientByIdRepository,
    createPaymentRepository,
    createPaymentUseCase,
    createPaymentController
  }
}
