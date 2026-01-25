import React, { useState, useEffect } from "react"

const EMPTY_JOB = {
  company: "",
  position: "",
  jobLocation: "",
  jobStatus: "",
  jobType: "",
  jobDescription: "",
  jobUrl: "",
}

const STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Interview", value: "interview" },
  { label: "Accepted", value: "accepted" },
  { label: "Declined", value: "declined" },
]
const TYPE_OPTIONS = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Internship", value: "internship" },
]
const LOCATION_OPTIONS = [
  "London, UK",
  "Liverpool, UK",
  "Manchester, UK",
  "Edinburgh, UK",
  "Ireland",
]

const JobForm = ({
  initialValue,
  onSubmit,
  submitting,
  title = "Add Job",
  submitLabel = "Save",
}) => {
  const [formData, setFormData] = useState(initialValue)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    await onSubmit(formData)
  }

  useEffect(() => {
    setFormData(initialValue)
  }, [initialValue])
  return (
    <div className='mt-10 rounded-3xl bg-white border border-gray-100 shadow-sm max-w-4xl mx-auto'>
      {" "}
      <div className='px-4 py-4 md:px-8 md:py-6 space-y-3'>
        <h1>{title}</h1>
        <form action='' method='post' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-2'>
            <Field label={"Company"}>
              <input
                type='text'
                name='company'
                value={formData.company}
                onChange={handleChange}
                placeholder='Company name'
                className='p-1 border border-gray-200 rounded-lg  focus-within:border-blue-600'
              />
            </Field>

            <Field label={"Position"}>
              <input
                type='text'
                name='position'
                value={formData.position}
                onChange={handleChange}
                placeholder='Job role'
                className='p-1 border border-gray-200 rounded-lg focus-within:border-blue-600'
              />
            </Field>

            <Field label={"Location"}>
              <select
                name='jobLocation'
                value={formData.jobLocation}
                onChange={handleChange}
                className='input'
              >
                <option value=''>Select location</option>
                {LOCATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={"Status"}>
              <select
                name='jobStatus'
                value={formData.jobStatus}
                onChange={handleChange}
                className='input'
              >
                <option value=''>Select status</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </Field>

            <Field label='Job type'>
              <select
                name='jobType'
                value={formData.jobType}
                onChange={handleChange}
                className='input'
              >
                <option value=''>Select job type</option>
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={"Job Description"}>
              <textarea
                name='jobDescription'
                value={formData.jobDescription}
                onChange={handleChange}
                rows={4}
                placeholder='Paste your Job description here'
                className='input resize-none'
              ></textarea>
            </Field>

            <Field label={"Job Listing Url"}>
              <input
                type='url'
                name='jobUrl'
                value={formData.jobUrl}
                onChange={handleChange}
                placeholder='paste your link here.......'
                className='input'
              />
            </Field>

            <div className='pt-2'>
              <button
                type='submit'
                disabled={submitting}
                className='w-full md:w-auto rounded-xl bg-blue-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60'
              >
                {submitting ? "Saving...." : submitLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const Field = ({ label, children }) => (
  <label className='flex flex-col gap-3 text-sm'>
    <span className='font-medium text-gray-700'>{label}</span>
    {children}
  </label>
)

export default JobForm
export { EMPTY_JOB }
