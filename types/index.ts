import { UserRole } from "../utils/constants.js"
export interface UserPayload {
  userId: string
  role: UserRole
}
