import React, { useState } from "react"
import { Link, Form, useNavigate } from "react-router-dom"
import RegisterImage from "./../assets/images/registerImage"
import Field from "../components/Field"
import { Plus } from "lucide-react"
import { X } from "lucide-react"
import { toast } from "react-toastify"
import { useRegisterUser } from "../hooks/useAuth"

const Register = () => {
  const navigate = useNavigate()
  const { mutate: registerUser, isPending } = useRegisterUser()
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    role: "user",
    skills: [], // [{ name, level, years? }]
  })
  // const [matchPass, setMatchPass] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [passError, setPassError] = useState()
  // const [submitting, setSubmitting] = useState(false)
  const LOCATION_OPTION = [
    "London, Uk",
    "Liverpool UK",
    "Manchester, UK",
    "Edinburgh, UK",
    "Ireland",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addSkill = () => {
    const trimmed = newSkill.trim()
    if (!trimmed) return

    setFormData((prev) => {
      const exists = prev.skills.some(
        (s) => s.name.toLowerCase() === trimmed.toLowerCase(),
      )
      if (exists) return prev

      return {
        ...prev,
        skills: [
          ...prev.skills,
          { name: trimmed.toLowerCase(), level: "intermediate" },
        ],
      }
    })
    setNewSkill("")
  }

  const removeSkill = (skillName) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (s) => s.name.toLowerCase() !== skillName.toLowerCase(),
      ),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPassError("")
    if (formData.password !== formData.confirmPassword) {
      setPassError("Password do not Match")
      return
    }
    // setSubmitting(true)

    const payload = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      location: formData.location,
      role: formData.role,
      skills: formData.skills,
    }

    registerUser(payload, {
      onSuccess: () => {
        toast.success("User Registered successfully")
        navigate("/dashboard")
      },
      onError: (error) => {
        toast.error(error.response?.data?.msg || "Registration failed")
      },
    })
  }
  return (
    <div className='min-h-screen relative flex items-center justify-center p-4 py-12'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: 'url("/images/register_bg.jpg")',
        }}
      >
        <div className='absolute inset-0 bg-blue-600/80'></div>
      </div>

      <div className='relative z-10 w-full max-w-4xl'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold text-white mb-2'>ApplyFlow</h1>
          <p className='text-blue-100 text-lg'>
            Start tracking your job applications today
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-2xl p-8'>
          <div className='text-center mb-6'>
            <h2 className='font-bold text-2xl text-gray-800'>
              Create your Account
            </h2>
            <p className='text-gray-600 mt-1'>Lets Lock In</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <Field label='First Name'>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter first name'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  required
                />
              </Field>
              <Field label='Last Name'>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Enter last name'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  required
                />
              </Field>
            </div>

            <Field label='Email Address'>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                required
              />
            </Field>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Field label='Location'>
                <select
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  required
                >
                  <option value=''>Select your location</option>
                  {LOCATION_OPTION.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label='Role'>
                <select
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                >
                  <option value='user'>User</option>
                  <option value='admin'>Admin</option>
                </select>
              </Field>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Field label='Password'>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  placeholder='Enter password'
                  required
                />
              </Field>
              <Field label='Confirm Password'>
                <input
                  type='password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm password'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  required
                />
              </Field>
            </div>

            <div>
              <p className='font-medium text-sm text-gray-700 mb-2'>
                Skills{" "}
                <span className='text-gray-400 font-normal'>(Optional)</span>
              </p>

              <div className='flex gap-2 mb-3'>
                <input
                  type='text'
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                  placeholder='Type a skill and press Enter'
                  className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                />
                <button
                  type='button'
                  className='flex justify-center items-center gap-2 px-4 py-3 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all'
                  onClick={addSkill}
                >
                  <Plus className='w-4 h-4' />
                  <span>Add</span>
                </button>
              </div>

              <div className='flex flex-wrap gap-2 min-h-8'>
                {formData.skills.length === 0 && (
                  <span className='text-xs text-gray-400'>
                    No skills added yet
                  </span>
                )}
                {formData.skills.map((skill) => (
                  <button
                    key={skill.name}
                    type='button'
                    onClick={() => removeSkill(skill.name)}
                    className='inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors'
                  >
                    <span className='capitalize'>{skill.name}</span>
                    <X className='w-3 h-3' />
                  </button>
                ))}
              </div>
            </div>

            {passError && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm'>
                {passError}
              </div>
            )}

            <button
              type='submit'
              disabled={isPending}
              className='w-full rounded-lg bg-blue-600 py-3 text-base font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl'
            >
              {isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className='text-center text-sm text-gray-600 mt-6'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='text-blue-600 font-semibold hover:text-blue-700'
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
