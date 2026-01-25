import customFetch from "../utils/customFetch"

export const register = async (formData) => {
  const res = await customFetch.post("/auth/register", formData)
  return res.data
}

export const login = async (formData) => {
  const res = await customFetch.post("/auth/login", formData)
  return res.data
}

export const getCurrentUser = async () => {
  const res = await customFetch.get("/users/current-user")
  return res.data.user
}

export const updateUser = async (formData) => {
  const res = await customFetch.patch("/users/update-user", formData)
  return res.data
}

export const logout = async () => {
  const res = await customFetch.get("/auth/logout")
  return res.data
}
