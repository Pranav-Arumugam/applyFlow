import { useNavigate } from "react-router-dom"
import { getEmptyJob } from "../utils/formData"
import JobForm from "../components/JobForm"
import { useCreateJob } from "../hooks/useJobs"
import { toast } from "react-toastify"
import { JobFormData } from "../types"
import axios from "axios"

const AddJob = () => {
  const navigate = useNavigate()

  const { mutate: createJob, isPending, error } = useCreateJob()

  const handleCreateJob = async (formData: JobFormData) => {
    createJob(formData, {
      onSuccess: () => {
        toast.success("Job created successfully")
        navigate("/dashboard/jobs")
      },
    })
  }
  return (
    <>
      {error && (
        <p className='text-sm text-red-600'>
          {axios.isAxiosError(error)
            ? error.response?.data?.msg
            : error.message || "Failed to create Job"}
        </p>
      )}
      <JobForm
        initialValue={getEmptyJob()}
        onSubmit={handleCreateJob}
        submitting={isPending}
        title='Add Job'
        submitLabel='Add Job'
      />
    </>
  )
}

export default AddJob
