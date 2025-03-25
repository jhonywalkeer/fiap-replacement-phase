import { ManyRequestsError } from '@common/errors'

export const ManyRequestsStub = () => {
  return new ManyRequestsError()
}
