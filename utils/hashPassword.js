import bcrypt from "bcryptjs"

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export const checkPassword = async (plainPassword, hashedPassword) => {
  const isMatch = bcrypt.compare(plainPassword, hashedPassword)
  return isMatch
}
