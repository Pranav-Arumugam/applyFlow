import React from "react"

const StatsBanner = ({ label, value, subtitle, color = "amber" }) => {
  const colorMap = {
    amber: "bg-amber-700",
    blue: "bg-blue-600",
    red: "bg-red-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    gray: "bg-gray-500",
  }
  return (
    <div
      className={`rounded-2xl relative ${colorMap[color]} bg-amber-700 min-w-32 h-40 shadow-sm`}
    >
      <div className='absolute min-w-32 w-full left-1.5 h-40 rounded-2xl bg-white shadow-sm'>
        {" "}
        <div className='z-50 flex flex-col justify-between p-6 space-y-3'>
          <div className='caption-top text-xl uppercase text-gray-600'>
            {label}
          </div>
          <h1 className='text-4xl text-shadow-black font-bold'>{value}</h1>
          <p className='text-sm text-gray-500 capitalize'>{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export default StatsBanner
