interface ICustomError {
  statusCode: number
  message: string
}
export declare class CustomError extends Error {
  statusCode: number
  constructor({ statusCode, message }: ICustomError)
}
export {}
