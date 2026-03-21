import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateUser,
} from "../services/authApi"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { RegisterFormData, LoginFormData, UserProfileFormData } from "../types"

export const useRegisterUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: RegisterFormData) => register(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user)
    },
  })
}

export const useLoginUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: LoginFormData) => login(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user)
    },
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}

export const useUpdateuser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: Partial<UserProfileFormData>) =>
      updateUser(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      navigate("/login")
      toast.success("Logged out Successfully")
    },
    onError: () => {
      queryClient.clear()
      navigate("/login")
    },
  })
}
