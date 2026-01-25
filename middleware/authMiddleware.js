import { UnauthenticatedError } from "../errors/customError.js"
import { verifyJWT } from "../utils/tokenUtils.js"

export const authenticateUser = (req, res, next) => {
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

export const authorizePermissions = (...rest) => {
  console.log(rest)
  next()
}
