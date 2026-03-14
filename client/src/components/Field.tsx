import React from "react"
interface FieldProps{
  label:string
  children:React.ReactNode
}
const Field = ({ label, children }:FieldProps) => (
  <label className='flex flex-col gap-3 text-sm'>
    <span className='font-medium text-gray-700'>{label}</span>
    {children}
  </label>
)

export default Field
