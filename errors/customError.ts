import { StatusCodes } from "http-status-codes"

export abstract class AppError extends Error {
  abstract statusCode: number
}

export class NotFoundError extends AppError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export class BadRequestError extends AppError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.name = "BadRequestError"
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export class UnauthenticatedError extends AppError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.name = "UnauthenticatedError"
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
