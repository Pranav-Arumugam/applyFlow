export const JOB_STATUS = {
  PENDING: "pending",
  INTERVIEW: "interview",
  DECLINED: "declined",
  ACCEPTED: "accepted",
} as const

export const JOB_TYPES = {
  FULLTIME: "full-time",
  PARTTIME: "part-time",
  INTERNSHIP: "internship",
} as const

export const JOB_MODE = {
  REMOTE: "remote",
  ON_SITE: "on-site",
  HYBRID: "hybrid",
} as const

export const JOB_SORT_BY = {
  RECENT: "newest",
  OLD: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
}

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const

export const INTERVIEW_MODE = {
  ONLINE: "online",
  ONSITE: "onsite",
  PHONE: "phone",
} as const

export const INTERVIEW_STATUS = {
  UPCOMING: "upcoming",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS]

export type JobType = (typeof JOB_TYPES)[keyof typeof JOB_TYPES]

export type JobMode = (typeof JOB_MODE)[keyof typeof JOB_MODE]

export type InterviewMode = (typeof INTERVIEW_MODE)[keyof typeof INTERVIEW_MODE]

export type InterviewStatus =
  (typeof INTERVIEW_STATUS)[keyof typeof INTERVIEW_STATUS]
