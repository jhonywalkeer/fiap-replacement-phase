export const FindClientBySocialNumberQuery = (parameter: any) => {
  return {
    where: {
      social_security_number: parameter.social_security_number
    }
  }
}
