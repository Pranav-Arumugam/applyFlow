import customFetch from "../utils/customFetch"

export const getAllInterviews = async () => {
  const res = await customFetch.get("/interviews")
  return res.data.interviews
}

export const getInterviewById = async (id) => {
  const res = await customFetch.get(`/interviews/${id}`)
  return res.data.interview
}

export const createInterview = async (formData) => {
  const res = await customFetch.post("/interviews", formData)
  return res.data.interview
}

export const editInterview = async (id, formData) => {
  console.log("id:", id)
  console.log("form Data:", formData)
  const res = await customFetch.patch(`/interviews/${id}`, formData)
  return res.data.interview
}

export const deleteInterview = async (id) => {
  const res = await customFetch.delete(`/interviews/${id}`)
  return res.data.msg
}

export const getStats = async () => {
  const res = await customFetch.get("/interviews/upcoming")
  return res.data
}
