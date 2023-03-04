export * from './auth'
export * from './todos'
export * from './users'

export const API_BASEPATH =
  import.meta.env.VITE_API_BASEPATH || 'http://localhost:3000/api/v1'
