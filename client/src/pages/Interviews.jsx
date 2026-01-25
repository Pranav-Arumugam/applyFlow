import React from "react"

const Interviews = ({ label, value, date }) => {
  return (
    <div className='mt-4'>
      <div className='flex justify-between mt-2'>
        <p>{label}</p>
        <p>{value}</p>
        <p>{date}</p>
      </div>
    </div>
  )
}

export default Interviews
