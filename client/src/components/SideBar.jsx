import React from "react"
import { Link } from "react-router-dom"

const SideBar = () => {
  const handleSignOut = () => {
    console.log("siginng out ")
  }
  return (
    <div className='flex flex-col h-full bg-gray-200 w-56 px-8 py-6 rounded-lg'>
      <ul className='flex flex-col gap-8  mt-4 '>
        <li className=''>
          <Link to='/dashboard' className='m-auto'>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to='/jobs' className='m-auto'>
            Jobs
          </Link>
        </li>
        <li>
          <Link to='/interview' className='m-auto'>
            Interview
          </Link>
        </li>
        <li>
          <Link to='/stats' className='m-auto'>
            Analytics
          </Link>
        </li>
        <li>
          <Link to='/profile' className='m-auto'>
            Profile
          </Link>
        </li>
      </ul>

      <button
        type='button'
        className='mt-auto mb-2 text-sm font-medium bg-red-900 px-8 py-2 rounded-2xl text-gray-50 hover:bg-red-700 transition-colors'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  )
}

export default SideBar
