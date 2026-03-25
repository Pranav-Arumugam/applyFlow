import { Schema, Document, PopulatedDoc, Types } from "mongoose"
import { JobDoc } from "../models/JobModel.js"
import {
  UserRole,
  InterviewMode,
  InterviewStatus,
  SortKey,
} from "../utils/constants.js"
import { SKILLS_BY_CATEGORY } from "../utils/skillsDb.js"
// -------------------------------- User Types and Interfaces --------------------------------
export interface UserPayload {
  userId: string
  role: UserRole
}

export type Skills = {
  name: string
  years: number
}

export interface Userstruct {
  name: string
  email: string
  password: string
  lastName: string
  location: string
  role: UserRole
  skills: Skills[]
}

export interface UserDocument extends Userstruct, Document {
  createdAt: Date
  updatedAt: Date
}

export type NonSensitiveUserData = Omit<Userstruct, "password">
// -------------------------------- Job Types and Interfaces --------------------------------

export interface JobFitAnalysis {
  matchedSkills: string[]
  missingSkills: string[]
  matchScore: number
  totalRequired: number
  totalMatched: number
}

export type queryObjectType = {
  createdBy: string
  jobStatus?: string
  jobType?: string
  $or?: Array<
    | { position?: { $regex: string; $options: string } }
    | { company?: { $regex: string; $options: string } }
  >
}

export type RequestQuery = {
  search?: string
  status?: string
  type?: string
  page?: number
  limit?: number
  sort?: SortKey
}

export type createJobRequestBody = {
  position: string
  company: string
  jobLocation: string
  jobType: string
  jobStatus: string
  jobDescription: string
  jobUrl: string
  createdBy?: string
  requiredSkills?: string[]
  matchedSkills?: string[]
  missingSkills?: string[]
  matchScore?: number
  totalRequired?: number
  totalMatched?: number
}

export type IdJobRequestParams = {
  id: string
}

export type updateJobRequestBody = Partial<createJobRequestBody>

export type stats = {
  _id: string
  count: number
}

export type monthStats = {
  _id: { year: number; month: number }
  count: number
}

export type defaultStats = {
  total: number
  pending: number
  interview: number
  accepted: number
  rejected: number
}

// -------------------------------- Interview Types and Interfaces --------------------------------
export interface Interview {
  company: string
  position: string
  interviewAt: Date
  mode: InterviewMode
  location?: string
  notes?: string
  job: PopulatedDoc<JobDoc>
  status: InterviewStatus
  createdBy: Types.ObjectId
}

export interface InterviewDoc extends Interview, Document {
  createdAt: Date
  updatedAt: Date
}

export type CreateInterviewBody = {
  company: string
  position: string
  interviewAt: Date
  mode: InterviewMode
  status: InterviewStatus
  location?: string
}

export type IdInterviewRequestParams = {
  id: string
}

export type updateInterviewRequestBody = Partial<CreateInterviewBody>

// -------------------------------- Auth Types and Interfaces --------------------------------

export interface RegisterBody {
  name: string
  email: string
  password: string
  lastName?: string
  location?: string
  role?: string
}

export interface LoginBody {
  email: string
  password: string
}

// -------------------------------- ApplyBuddy Types and Interfaces --------------------------------

export type Catkey = keyof typeof SKILLS_BY_CATEGORY
