import React from "react"

const Reminder = ({ title, dueAt }) => {
  return (
    <div className='mt-4'>
      <div className='flex justify-between mt-2'>
        <p>{title}</p>
        <p>{dueAt}</p>
      </div>
    </div>
  )
}

export default Reminder
