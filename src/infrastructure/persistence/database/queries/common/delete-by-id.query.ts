export const DeleteByIdQuery = (parameter: any) => {
  return {
    where: {
      id: parameter.id
    }
  }
}
