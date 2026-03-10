import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getAllInterviews,
  getInterviewById,
  editInterview,
  createInterview,
  deleteInterview,
} from "../services/interviewApi"
import { InterviewFormData, EditInterviewParams } from "../types"

export const useGetAllInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: getAllInterviews,
  })
}

export const useGetInterviewById = (id: string) => {
  return useQuery({
    queryKey: ["interviews", id],
    queryFn: () => getInterviewById(id),
  })
}

export const useCreateInterview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: InterviewFormData) => createInterview(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
    },
  })
}

export const useEditInterview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, formData }: EditInterviewParams) =>
      editInterview(id, formData),
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
      queryClient.invalidateQueries({ queryKey: ["interviews", vars.id] })
      queryClient.setQueryData(["interviews", vars.id], data)
    },
  })
}

export const useDeleteInterview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteInterview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
    },
  })
}

// export const useGetStats = () => {
//   const query
// }
