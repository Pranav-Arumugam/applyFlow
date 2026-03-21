import jwt, { SignOptions } from "jsonwebtoken"
import { UserPayload } from "../types/index.js"
import { ENV } from "./env.js"

export const createJWT = (payload: UserPayload): string => {
  //   console.log(process.env.JWT_SECRET)
  //   console.log(process.env.JWT_EXPIRES_IN)
  const token = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  })
  return token
}

export const verifyJWT = (token: string): UserPayload => {
  const verified = jwt.verify(token, ENV.JWT_SECRET) as UserPayload
  return verified
}
