import { UserRole } from "../utils/constants.js"
export interface UserPayload {
  userId: string
  role: UserRole
}

export interface JobFitAnalysis {
  matchedSkills: string[]
  missingSkills: string[]
  matchScore: number
  totalRequired: number
  totalMatched: number
}
