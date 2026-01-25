import React from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
const RouteIndicator = ({ route, buttonName }) => {
  return (
    <div className='flex items-center justify-between mb-4'>
      <p className='text-lg font-bold'>{route}</p>
      <Link
        to={"/dashboard/jobs/new"}
        className='border-2 border-black px-3 py-1 rounded flex gap-2 items-center'
      >
        <Plus className='w-4 h-4' />
        <span>{buttonName}</span>
      </Link>
    </div>
  )
}

export default RouteIndicator
