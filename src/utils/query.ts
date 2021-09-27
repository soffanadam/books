export const override = (
  oldQuery: PlainObject,
  query: PlainObject
): PlainObject => {
  const newQuery = Object.assign({}, oldQuery, query)

  for (const queryKey in query) {
    if (query[queryKey] === '') {
      delete newQuery[queryKey]
    }
  }

  return newQuery
}

export default { override }
