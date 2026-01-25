import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js"
import { UnauthenticatedError } from "../errors/customError.js"
import { checkPassword } from "../utils/hashPassword.js"
import { createJWT } from "../utils/tokenUtils.js"

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0
  req.body.role = isFirstUser ? "admin" : "user"
  const user = await User.create(req.body)

  const token = createJWT({ userId: user._id, role: user.role })
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  })
  const userWithoutPassword = user.toJSON()
  res
    .status(StatusCodes.CREATED)
    .json({ user: userWithoutPassword, msg: "Registeration Successful" })
}

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  //checking if the user is valid or not
  const isValidUser =
    user && (await checkPassword(req.body.password, user.password))
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials ")

  const token = createJWT({ userId: user._id, role: user.role })
  const oneDay = 1000 * 60 * 60 * 24 //token for valid 1 day
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  })

  const userWithoutPassword = user.toJSON()
  res
    .status(StatusCodes.OK)
    .json({ msg: "user logged in", user: userWithoutPassword })
}

export const Logout = async (req, res) => {
  res.cookie("token", {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: "user logged out" })
}
