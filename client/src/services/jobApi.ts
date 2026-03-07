import customFetch from "../utils/customFetch"
import {
  Job,
  JobFilters,
  JobFormData,
  JobsResponse,
  StatsResponse,
} from "../types"
export const getAllJobs = async (
  filters: JobFilters = {},
): Promise<JobsResponse> => {
  const params = new URLSearchParams()
  if (filters.search) params.append("search", filters.search)
  if (filters.status && filters.status !== "all")
    params.append("status", filters.status)
  if (filters.type && filters.type !== "all")
    params.append("type", filters.type)
  if (filters.sort) params.append("sort", filters.sort)
  if (filters.page) params.append("page", filters.page.toString())
  if (filters.limit) params.append("limit", filters.limit.toString())

  const queryString = params.toString()
  const url = queryString ? `/jobs?${queryString}` : "/jobs"
  const res = await customFetch.get(url)
  return res.data
}

export const getJobById = async (id: string): Promise<Job> => {
  const res = await customFetch.get(`/jobs/${id}`)
  return res.data.job
}

export const createJob = async (formData: JobFormData): Promise<Job> => {
  const res = await customFetch.post("/jobs", formData)
  return res.data.job
}

export const editJob = async (
  id: string,
  formData: Partial<JobFormData>,
): Promise<Job> => {
  const res = await customFetch.patch(`/jobs/${id}`, formData)
  return res.data.job
}

export const deleteJob = async (id: string): Promise<string> => {
  const res = await customFetch.delete(`/jobs/${id}`)
  return res.data.msg
}

export const getStats = async (): Promise<StatsResponse> => {
  const res = await customFetch.get("/jobs/stats")
  return res.data
}
