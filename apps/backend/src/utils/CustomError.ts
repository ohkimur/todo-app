interface ICustomError {
  statusCode: number
  message: string
}

export class CustomError extends Error {
  statusCode: number

  constructor({ statusCode, message }: ICustomError) {
    super(message)
    this.statusCode = statusCode
  }
}
