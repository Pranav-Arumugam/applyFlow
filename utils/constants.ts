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

export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS]

export type JobType = (typeof JOB_TYPES)[keyof typeof JOB_TYPES]

export type JobMode = (typeof JOB_MODE)[keyof typeof JOB_MODE]
