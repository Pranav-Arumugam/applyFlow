import React from "react"

const MatchScore = ({ matchScore }) => (
  <div className='rounded-2xl bg-white p-4 shadow-sm border border-gray-100 space-y-3'>
    <div className='flex items-center justify-between'>
      <h3 className='text-sm font-semibold'>Match score</h3>
      <span className='text-sm font-medium'>{matchScore}%</span>
    </div>
    <div className='h-2 w-full rounded-full bg-gray-100 overflow-hidden'>
      <div
        className='h-full bg-linear-to-r from-yellow-300 via-lime-400 to-emerald-500'
        style={{ width: `${matchScore}%` }}
      />
    </div>
  </div>
)

export default MatchScore
