import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts"

const StatsChart = ({ stats }) => {
  return (
    <>
      {" "}
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={stats}>
          <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
          <XAxis dataKey='date' tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Line
            type='monotone'
            dataKey='count'
            stroke='#8b5cf6'
            strokeWidth={3}
            dot={{ fill: "#8b5cf6", r: 5 }}
            name='Applications'
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default StatsChart
