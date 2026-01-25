import jwt from "jsonwebtoken"

export const createJWT = (payload) => {
  //   console.log(process.env.JWT_SECRET)
  //   console.log(process.env.JWT_EXPIRES_IN)
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return token
}

export const verifyJWT = (token) => {
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  return verified
}
