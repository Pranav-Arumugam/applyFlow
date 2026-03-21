import React from "react"

import {
  InterviewMode,
  InterviewStatus,
  JobMode,
  JobStatus,
  JobType,
  UserRole,
} from "../utils/constants"

// -------- skills ------ source: backend/src/types/index.ts --------
export type Skills = {
  name: string
  years: number
}
// --------user -------- backend source: Userstruct --------
export interface User {
  _id: string
  name: string
  email: string
  lastName: string
  location: string
  role: UserRole
  skills: Skills[]
}

export interface Job {
  _id: string
  position: string
  company: string
  jobLocation: string
  jobType: JobType
  jobStatus: JobStatus
  jobDescription?: string
  jobUrl: string
  jobMode: JobMode
  requiredSkills: string[]
  matchedSkills: string[]
  missingSkills: string[]
  totalRequired: number
  totalMatched: number
  matchScore: number
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Interview {
  _id: string
  company: string
  position: string
  interviewAt: string
  mode: InterviewMode
  location?: string
  notes?: string
  job?: Job | string
  status: InterviewStatus
  createdBy: string
  createdAt: string
  updatedAt: string
}

//Api request types

export interface AuthResponse {
  user: User
  msg: string
}

export interface JobsResponse {
  jobs: Job[]
  pagination: {
    page: number
    limit: number
    totalPages: number
    totalJobs: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface MonthStat {
  date: string
  count: number
}

export interface StatsResponse {
  defaultStatus: {
    total: number
    pending: number
    interview: number
    accepted: number
    rejected: number
  }
  monthStats: MonthStat[]
  recentApplications: Job[]
}

export interface InterviewStatsResponse {
  upcomingInterview: Interview[]
  monthlyInterview: {
    date: string
    count: number
  }[]
}
//Form data types

export interface RegisterFormData {
  name: string
  email: string
  password: string
  lastName: string
  location: string
  role?: UserRole
  skills: Skills[]
}



export interface LoginFormData {
  email: string
  password: string
}

export interface JobFormData {
  company: string
  position: string
  jobLocation: string
  jobStatus?: JobStatus
  jobMode?: JobMode
  jobType?: JobType
  jobDescription?: string
  jobUrl: string
}

export interface InterviewFormData {
  company: string
  position: string
  interviewAt: string
  mode?: InterviewMode
  job?: string
  location?: string
  status: InterviewStatus
  notes?: string
}

export interface UserProfileFormData {
  name: string
  lastName: string
  email: string
  location: string
  skills: Skills[]
}

export interface JobFilters {
  search?: string
  status?: string
  type?: string
  sort?: string
  page?: number
  limit?: number
}

export interface EditJobParams {
  id: string
  formData: Partial<JobFormData>
}

export interface EditInterviewParams {
  id: string
  formData: Partial<InterviewFormData>
}

//---------- component props types ---------

export interface PageInfo {
  title: string
  icon: React.ReactNode
  breadcrumbs: string[]
  gradient: string
}

export type TabType = "Jobdescription" | "Overview" | "Skills"