export type BaseRepository =
  | 'findAll'
  | 'findById'
  | 'findByCondition'
  | 'findBySocialNumber'
  | 'create'
  | 'update'
  | 'updateVehicleWithStatus'
  | 'updateSaleWithPaymentId'
  | 'delete'

export type CreateRepository = Exclude<BaseRepository, 'create'>
export type UpdateRepository = Exclude<BaseRepository, 'update'>
export type UpdateVehicleWithStatusRepository = Exclude<
  BaseRepository,
  'updateVehicleWithStatus'
>
export type UpdateSaleWithPaymentIdRepository = Exclude<
  BaseRepository,
  'updateSaleWithPaymentId'
>
export type DeleteRepository = Exclude<BaseRepository, 'delete'>
export type FindByIdRepository = Exclude<BaseRepository, 'findById'>
export type FindByConditionRepository = Exclude<
  BaseRepository,
  'findByCondition'
>
export type FindBySocialNumberRepository = Exclude<
  BaseRepository,
  'findBySocialNumber'
>
export type FindAllRepository = Exclude<BaseRepository, 'findAll'>
