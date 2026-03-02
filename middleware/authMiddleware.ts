import { UnauthenticatedError } from "../errors/customError.js"
import { verifyJWT } from "../utils/tokenUtils.js"
import { Request, Response, NextFunction } from "express"
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  //checking for cookie
  const { token } = req.cookies
  if (!token) throw new UnauthenticatedError("Authentication invalid")

  try {
    const { userId, role } = verifyJWT(token) //decoding the token
    req.user = { userId, role }
    next()
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid")
  }

  //   console.log(req.cookies)
}

// export const authorizePermissions = (...rest) => {
//   console.log(rest)
//   next()
// }
