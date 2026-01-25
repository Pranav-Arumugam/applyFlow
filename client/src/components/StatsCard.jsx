import React from "react"

const StatsCard = ({ title, value, icon, color, trend, onClick }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  }

  return (
    <div
      onClick={onClick}
      className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer hover:border-blue-300'
    >
      <div className='flex items-center justify-between mb-4'>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
        >
          {icon}
        </div>
      </div>
      <h3 className='text-gray-600 text-sm font-medium mb-1'>{title}</h3>
      <p className='text-3xl font-bold text-gray-900 mb-2'>{value}</p>
      <p className='text-xs text-gray-500'>{trend}</p>
    </div>
  )
}

export default StatsCard
