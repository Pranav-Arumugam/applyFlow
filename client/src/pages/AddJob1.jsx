import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Interview", value: "interview" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
]

const TYPE_OPTIONS = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Internship", value: "internship" },
  { label: "Contract", value: "contract" },
]

const LOCATION_OPTIONS = [
  "London, UK",
  "Liverpool, UK",
  "Manchester, UK",
  "Edinburgh, UK",
  "Ireland",
]

const AddJob1 = () => {
  const navigate = useNavigate()

  // 1) form state
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    jobLocation: "Manchester, UK",
    jobStatus: "pending",
    jobType: "full-time",
    jobDescription: "",
    jobUrl: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  // 2) generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 3) submit handler (POST to your API)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      await axios.post("/api/v1/jobs", formData)
      navigate("/dashboard/jobs")
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.msg ||
          "Something went wrong while creating the job."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='mt-8'>
      <div className='rounded-3xl bg-white border border-gray-100 shadow-sm max-w-4xl'>
        <div className='px-4 py-4 md:px-8 md:py-6'>
          <h1 className='text-xl md:text-2xl font-semibold mb-4'>Add Job</h1>

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* top grid: company, position, location, status */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Field label='Company'>
                <input
                  type='text'
                  name='company'
                  value={formData.company}
                  onChange={handleChange}
                  placeholder='Google'
                  className='input'
                />
              </Field>

              <Field label='Position'>
                <input
                  type='text'
                  name='position'
                  value={formData.position}
                  onChange={handleChange}
                  placeholder='Python Developer'
                  className='input'
                />
              </Field>

              <Field label='Location'>
                <select
                  name='jobLocation'
                  value={formData.jobLocation}
                  onChange={handleChange}
                  className='input'
                >
                  {LOCATION_OPTIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label='Status'>
                <select
                  name='jobStatus'
                  value={formData.jobStatus}
                  onChange={handleChange}
                  className='input'
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
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
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* description */}
            <Field label='Job Description'>
              <textarea
                name='jobDescription'
                value={formData.jobDescription}
                onChange={handleChange}
                rows={4}
                placeholder='We are looking for python developer with React and API operation experience needed...'
                className='input resize-none'
              />
            </Field>

            {/* job URL */}
            <Field label='Job listing URL'>
              <input
                type='url'
                name='jobUrl'
                value={formData.jobUrl}
                onChange={handleChange}
                placeholder='http://localhost:5173/dashboard/jobs'
                className='input'
              />
            </Field>

            {error && <p className='text-sm text-red-600'>{error}</p>}

            <div className='pt-2'>
              <button
                type='submit'
                disabled={submitting}
                className='w-full md:w-auto rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60'
              >
                {submitting ? "Adding..." : "Add Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// small helper so label + input styling is consistent
const Field = ({ label, children }) => (
  <label className='flex flex-col gap-1 text-sm'>
    <span className='font-medium text-gray-700'>{label}</span>
    {children}
  </label>
)

export default AddJob1
