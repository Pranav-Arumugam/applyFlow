import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Field from "../components/Field"
import { useState } from "react"
import { toast } from "react-toastify"
import { useLoginUser } from "../hooks/useAuth"

const Login = () => {
  const navigate = useNavigate()
  const { mutate: loginUser, isPending } = useLoginUser()
  // const [submitting, setSubmitting] = useState(false)
  // const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // const errors = { msg: "" }

    loginUser(formData, {
      onSuccess: () => {
        toast.success("User logged in Successfully")
        navigate("/dashboard")
      },
      onError: (error) => {
        toast.error(error.response?.data?.msg || "Login failed")
      },
    })
    // try {
    //   const res = await customFetch.post("/auth/login", formData)

    //   // if your backend returns token+user:
    //   // const { user, token } = res.data
    //   // localStorage.setItem("token", token)
    //   // maybe store user in context later
    //   toast.success("Login successful")
    //   navigate("/dashboard")
    // } catch (err) {
    //   toast.error(err)
    //   setError(
    //     err.response?.data?.msg || "Unable to log in. Check your details.",
    //   )
    // } finally {
    //   setSubmitting(false)
    // }
  }
  return (
    <div className='min-h-screen relative flex items-center justify-center p-4'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        {/* Blue Overlay */}
        <div className='absolute inset-0 bg-blue-600 opacity-80'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 w-full max-w-md'>
        {/* Logo/Title */}
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold text-white mb-2'>ApplyFlow</h1>
          <p className='text-blue-100 text-lg'>Track your job applications</p>
        </div>

        {/* Login Card */}
        <div className='bg-white rounded-2xl shadow-2xl p-8'>
          <h2 className='font-bold text-2xl mb-6 text-gray-800 text-center'>
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className='space-y-5'>
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

            <Field label='Password'>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                required
              />
            </Field>

            <button
              type='submit'
              disabled={isPending}
              className='w-full rounded-lg bg-blue-600 py-3 text-base font-semibold text-white hover:bg-blue-700 disabled:opacity-60 transition-all shadow-lg hover:shadow-xl'
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{" "}
              <Link
                to='/register'
                className='text-blue-600 font-semibold hover:text-blue-700'
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
