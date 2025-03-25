export const FindByIdQuery = (parameter: any) => {
  return {
    where: {
      id: parameter.id
    }
  }
}
