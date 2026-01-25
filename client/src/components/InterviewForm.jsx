import React, { useEffect, useMemo } from "react"
import { useCreateInterview, useEditInterview } from "../hooks/useInterview"
import { toast } from "react-toastify"

const isoToLocalDatetime = (iso) => {
  if (!iso) return ""
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`
}

const EmptyData = {
  company: "",
  position: "",
  interviewAt: "",
  mode: "",
  location: "",
  status: "",
  notes: "",
}

const InterviewForm = ({
  submitLabel = "Save interview",
  mode,
  initialValues,
  onClose,
}) => {
  //   const interviewData = {
  //     company: "Google",
  //     position: "Full Stack Developer",
  //     interviewAt: "2026-01-25T14:30:00.000Z",
  //     mode: "online",
  //     location: "London",
  //     status: "upcoming",
  //     notes: "Teaching round with senior developer",
  //   }
  const toPayload = (data) => ({
    ...data,
    interviewAt: data.interviewAt
      ? new Date(data.interviewAt).toISOString()
      : "",
  })
  const {
    mutate: createInterview,
    isPending: isCreating,
    error: createError,
  } = useCreateInterview()
  const {
    mutate: editInterview,
    isPending: isEditing,
    error: editError,
  } = useEditInterview()

  const initial = useMemo(() => {
    if (mode === "edit" && initialValues) {
      return {
        ...EmptyData,
        ...initialValues,
        interviewAt: isoToLocalDatetime(initialValues.interviewAt),
      }
    }
    return { ...EmptyData }
  }, [mode, initialValues])
  const [formData, setFormData] = React.useState(initial)
  const INTERVIEW_MODE = [
    {
      label: "Online",
      value: "online",
    },
    {
      label: "In-Person",
      value: "onsite",
    },
    {
      label: "Phone",
      value: "phone",
    },
  ]

  const INTERVIEW_STATUS = [
    {
      label: "Upcoming",
      value: "upcoming",
    },
    {
      label: "Completed",
      value: "completed",
    },
    {
      label: "Cancelled",
      value: "cancelled",
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleCreateInterview = () => {
    createInterview(toPayload(formData), {
      onSuccess: () => {
        toast.success("Interview created successfully")
        onClose?.()
      },
    })
  }

  const handleEditInterview = () => {
    editInterview(
      { id: formData._id, formData: toPayload(formData) },
      {
        onSuccess: () => {
          toast.success("Interview updated successfully")
          onClose?.()
        },
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // console.log(timeFormatter(formData.interviewAt))

    if (mode === "edit") {
      handleEditInterview()
    } else {
      handleCreateInterview()
    }
  }

  useEffect(() => {
    console.log("Effect triggered!")
    setFormData(initial)
  }, [initial])

  const isPending = isCreating || isEditing
  return (
    <div className='mt-10  rounded-2xl max-w-4xl p-3'>
      <h1 className='text-2xl font-semibold mb-4 text-gray-600'>
        Interview Form
      </h1>
      <form action='' method='post' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4'>
          <Field label={"Company"}>
            <input
              type='text'
              name='company'
              value={formData.company}
              onChange={handleChange}
              placeholder='Company name'
              className='p-2 border border-gray-200 rounded-lg  focus-within:border-blue-600'
            />
          </Field>
          <Field label={"Position"}>
            <input
              type='text'
              name='position'
              value={formData.position}
              onChange={handleChange}
              placeholder='Job position'
              className='p-2 border border-gray-200 rounded-lg  focus-within:border-blue-600'
            />
          </Field>
          <Field label={"Interview Date & Time"}>
            <input
              type='datetime-local'
              name='interviewAt'
              value={formData.interviewAt}
              onChange={handleChange}
              placeholder='Select date and time'
              className='p-2 border border-gray-200 rounded-lg  focus-within:border-blue-600'
            />
          </Field>
          <Field label={"Interview Mode"}>
            <select
              name='mode'
              value={formData.mode}
              onChange={handleChange}
              className='input'
            >
              <option value=''>Select Mode</option>
              {INTERVIEW_MODE.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label={"Location"}>
            <input
              type='text'
              name='location'
              value={formData.location}
              onChange={handleChange}
              placeholder='Provide meeting link or Location'
              className='p-2 border border-gray-200 rounded-lg  focus-within:border-blue-600'
            />
          </Field>
          <Field label={"Status"}>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='input'
            >
              <option value=''>Select Status</option>
              {INTERVIEW_STATUS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label={"Notes"}>
            <input
              type='text'
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              placeholder='Additional notes'
              className='p-2 border border-gray-200 rounded-lg  focus-within:border-blue-600'
            />
          </Field>
          <div className='pt-2'>
            <button
              type='submit'
              disabled={isPending}
              className='w-full md:w-auto rounded-xl bg-blue-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60'
            >
              {isPending ? "Saving...." : submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const Field = ({ label, children }) => (
  <label className='flex flex-col gap-3 text-sm'>
    <span className='font-medium text-gray-700'>{label}</span>
    {children}
  </label>
)

export default InterviewForm
