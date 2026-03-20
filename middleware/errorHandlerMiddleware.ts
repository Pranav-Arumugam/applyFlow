import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/customError.js"
const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "something went wrong , try again later" })
}

export default errorHandlerMiddleware
