import React, { useState, useEffect, useMemo } from "react"
import { useCreateInterview, useEditInterview } from "../hooks/useInterview"
import { toast } from "react-toastify"
import { Interview, InterviewFormData } from "../types"
import {
  INTERVIEW_MODE,
  INTERVIEW_MODE_OPTIONS,
  INTERVIEW_STATUS,
  INTERVIEW_STATUS_OPTIONS,
} from "../utils/constants"
import { isoToLocalDatetime } from "../utils/timeFormater"
import Field from "./Field"

const EmptyData: InterviewFormData = {
  company: "",
  position: "",
  interviewAt: "",
  mode: INTERVIEW_MODE.ONLINE,
  location: "",
  status: INTERVIEW_STATUS.UPCOMING,
  notes: "",
}

interface InterviewFormProps {
  submitLabel?: string
  mode: "create" | "edit"
  initialValues?: Interview
  onClose?: () => void
}

const InterviewForm = ({
  submitLabel = "Save interview",
  mode,
  initialValues,
  onClose,
}: InterviewFormProps) => {
  const toPayload = (data: InterviewFormData): InterviewFormData => ({
    ...data,
    interviewAt: data.interviewAt
      ? new Date(data.interviewAt).toISOString()
      : "",
  })

  //create interview Mutation hook called ------------------------
  const {
    mutate: createInterview,
    isPending: isCreating,
    error: createError,
  } = useCreateInterview()

  ///edit interview mutation hook called -----------------------------------------------------
  const {
    mutate: editInterview,
    isPending: isEditing,
    error: editError,
  } = useEditInterview()

  const editId = mode === "edit" ? initialValues?._id : undefined

  const initial = useMemo<InterviewFormData>(() => {
    if (mode === "edit" && initialValues) {
      return {
        company: initialValues.company,
        position: initialValues.position,
        interviewAt: isoToLocalDatetime(initialValues.interviewAt),
        mode: initialValues.mode || INTERVIEW_MODE.ONLINE,
        location: initialValues.location || "",
        status: initialValues.status || INTERVIEW_STATUS.UPCOMING,
        notes: initialValues.notes || "",
      }
    }
    return { ...EmptyData }
  }, [mode, initialValues])

  //setting the form data state with initial value for edit mode and create mode.

  const [formData, setFormData] = useState(initial)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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

  const handleEditInterview = (editId: string) => {
    if (!editId) {
      toast.error("Missing interview ID for editing")
      return
    }
    editInterview(
      { id: editId, formData: toPayload(formData) },
      {
        onSuccess: () => {
          toast.success("Interview updated successfully")
          onClose?.()
        },
      },
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    // console.log(timeFormatter(formData.interviewAt))

    if (mode === "edit") {
      handleEditInterview(editId!)
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
              {INTERVIEW_MODE_OPTIONS.map((option) => (
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
              {INTERVIEW_STATUS_OPTIONS.map((option) => (
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

export default InterviewForm
