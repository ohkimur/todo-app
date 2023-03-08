export const parseBoolean = (value: unknown) => {
  return value !== undefined ? value === 'true' : undefined
}
