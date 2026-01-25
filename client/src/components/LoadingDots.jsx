import React from "react"

const LoadingDots = () => {
  return (
    <div className='flex justify-center items-center h-64 space-x-2'>
      <div
        className='w-3 h-3 bg-blue-600 rounded-full animate-bounce'
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className='w-3 h-3 bg-blue-600 rounded-full animate-bounce'
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className='w-3 h-3 bg-blue-600 rounded-full animate-bounce'
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  )
}

export default LoadingDots
