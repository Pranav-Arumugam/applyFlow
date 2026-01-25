import React from "react"
import { Link, useRouteError } from "react-router-dom"
import NotFoundImage from "./../assets/images/not-found"

const Error = () => {
  const error = useRouteError()
  console.error(error)
  if (error.status === 404) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='h-1/2 w-1/2 flex items-center justify-center  '>
          <NotFoundImage />
        </div>

        <h1 className='font-bold text-4xl text-blue-600'>
          404 - Page Not Found
        </h1>
        <p className='mt-4 text-gray-600'>
          Sorry ,we can't find the page your are looking for{" "}
        </p>
        <Link
          to='/dashboard'
          className='mt-4 px-4 py-3 bg-blue-700 rounded-lg text-white'
        >
          back home
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Something Went Wrong</h1>
      <Link to='/'>back home</Link>
    </div>
  )
}

export default Error
