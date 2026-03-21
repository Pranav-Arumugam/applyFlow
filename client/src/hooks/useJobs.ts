import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query"
import {
  createJob,
  getAllJobs,
  getJobById,
  getStats,
  editJob,
  deleteJob,
} from "../services/jobApi"
import { JobFilters, JobFormData, EditJobParams } from "../types"

export const useGetAllJobs = (filters: JobFilters = {}) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getAllJobs(filters),
    staleTime: 30_000, // 1 minute
    placeholderData: (previousData) => previousData,
  })
}

export const useGetJob = (id: string) => {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => getJobById(id),
    enabled: !!id,
  })
}

export const useCreateJob = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: JobFormData) => createJob(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
    },
  })
}

export const useEditJob = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, formData }: EditJobParams) => editJob(id, formData),
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      queryClient.setQueryData(["jobs", vars.id], data)
    },
  })
}

export const useDeleteJob = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
    },
  })
}

export const useGetStats = () => {
  // const queryClient = useQueryClient()
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 60_000,
  })
}
