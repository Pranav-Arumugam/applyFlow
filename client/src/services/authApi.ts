import customFetch from "../utils/customFetch"
import {
  RegisterFormData,
  UserProfileFormData,
  LoginFormData,
  AuthResponse,
  User,
} from "../types"
export const register = async (
  formData: RegisterFormData,
): Promise<AuthResponse> => {
  const res = await customFetch.post("/auth/register", formData)
  return res.data
}

export const login = async (formData: LoginFormData): Promise<AuthResponse> => {
  const res = await customFetch.post("/auth/login", formData)
  return res.data
}

export const getCurrentUser = async (): Promise<User> => {
  const res = await customFetch.get("/users/current-user")
  return res.data.user
}

export const updateUser = async (
  formData: Partial<UserProfileFormData>,
): Promise<AuthResponse> => {
  const res = await customFetch.patch("/users/update-user", formData)
  return res.data
}

export const logout = async (): Promise<{ msg: string }> => {
  const res = await customFetch.get("/auth/logout")
  return res.data
}
