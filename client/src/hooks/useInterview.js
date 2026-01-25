import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import {
  getAllInterviews,
  getInterviewById,
  editInterview,
  createInterview,
  deleteInterview,
} from "../services/interviewApi"

export const useGetAllInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: getAllInterviews,
  })
}

export const useGetInterviewById = (id) => {
  return useQuery({
    queryKey: ["interviews", id],
    queryFn: getInterviewById.bind(null, id),
  })
}

export const useCreateInterview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData) => createInterview(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
    },
  })
}

export const useEditInterview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ formData, id }) => editInterview(id, formData),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
      queryClient.invalidateQueries({ queryKey: ["interviews", vars.id] })
    },
  })
}

export const useDeleteInterview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteInterview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
    },
  })
}

// export const useGetStats = () => {
//   const query
// }
