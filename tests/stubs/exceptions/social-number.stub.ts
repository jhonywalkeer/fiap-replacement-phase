import { HttpException, SocialNumberError } from '@common/errors'

export const SocialNumberStub = (): HttpException => {
  return new SocialNumberError()
}
