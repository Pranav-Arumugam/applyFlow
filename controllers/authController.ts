import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js"
import { UnauthenticatedError } from "../errors/customError.js"
import { checkPassword } from "../utils/hashPassword.js"
import { createJWT } from "../utils/tokenUtils.js"
import { Request, Response } from "express"
import { RegisterBody, LoginBody } from "../types/index.js"

export const register = async (req: Request, res: Response): Promise<void> => {
  const isFirstUser = (await User.countDocuments()) === 0
  const body = req.body as RegisterBody
  body.role = isFirstUser ? "admin" : "user"
  const user = await User.create(body)

  const token = createJWT({ userId: user._id.toString(), role: user.role })
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

export const login = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as LoginBody
  const user = await User.findOne({ email: body.email })
  //checking if the user is valid or not
  const isValidUser =
    user && (await checkPassword(body.password, user.password))
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials ")

  const token = createJWT({ userId: user._id.toString(), role: user.role })
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

export const Logout = async (req: Request, res: Response): Promise<void> => {
  res.cookie("token", {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: "user logged out" })
}

export const getAuthStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) throw new UnauthenticatedError("user not authenticated")
  const user = await User.findById(req.user.userId).select("-password")
  if (!user) throw new UnauthenticatedError("user not found")
  res.status(StatusCodes.OK).json({
    user: {
      userId: req.user.userId,
      name: user.name,
    },
    authenticated: true,
    msg: "Authenticated",
  })
}
