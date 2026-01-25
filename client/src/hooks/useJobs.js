import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createJob, getAllJobs, getJobById, getStats } from "../services/jobApi"
import { editJob } from "../services/jobApi"
import { deleteJob } from "../services/jobApi"

export const useGetAllJobs = (filters = {}) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getAllJobs(filters),
    staleTime: 30_000, // 1 minute
    keepPreviousData: true,
  })
}

export const useGetJob = (id) => {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => getJobById(id),
    enabled: !!id,
  })
}

export const useCreateJob = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData) => createJob(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
    },
  })
}

export const useEditJob = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, formData }) => editJob(id, formData),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      queryClient.invalidateQueries({ queryKey: ["jobs", vars.id] })
    },
  })
}

export const useDeleteJob = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteJob(id),
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
