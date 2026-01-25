import React from "react"

const Field = ({ label, children }) => (
  <label className='flex flex-col gap-3 text-sm'>
    <span className='font-medium text-gray-700'>{label}</span>
    {children}
  </label>
)

export default Field
