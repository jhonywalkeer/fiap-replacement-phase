import { ExpressRouteAdapter } from '@main/adapters/framework'
import {
  CreateVehicleControllerFactory,
  DeleteVehicleControllerFactory,
  FindAllVehiclesControllerFactory,
  FindVehicleByIdControllerFactory,
  UpdateVehicleControllerFactory
} from '@main/factories/vehicle'
import { Router } from 'express'

export const VehicleRoute = Router()

const { createVehicleController } = CreateVehicleControllerFactory()
const { findAllVehicleController } = FindAllVehiclesControllerFactory()
const { findVehicleByIdController } = FindVehicleByIdControllerFactory()
const { deleteVehicleController } = DeleteVehicleControllerFactory()
const { updateVehicleController } = UpdateVehicleControllerFactory()

VehicleRoute.post('/', ExpressRouteAdapter(createVehicleController))
  .get('/', ExpressRouteAdapter(findAllVehicleController))
  .get('/:id', ExpressRouteAdapter(findVehicleByIdController))
  .delete('/:id', ExpressRouteAdapter(deleteVehicleController))
  .patch('/:id', ExpressRouteAdapter(updateVehicleController))
  .put('/:id', ExpressRouteAdapter(updateVehicleController))
