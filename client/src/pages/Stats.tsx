
import { useGetStats } from "../hooks/useJobs"
import LoadingDots from "../components/LoadingDots"
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import StatsCard from "../components/StatsCard"
import StatsChart from "../components/StatsChart"
import { MonthStat } from "../types"

const Stats = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetStats()
  console.log(data)
  const { defaultStatus, monthStats } = data || {
    defaultStatus:{
      total: 0,
      pending: 0,
      interview: 0,
      accepted: 0,
      rejected: 0,
    },
    monthStats: [],
  }
  const stats = defaultStatus
  // console.log(stats)

  const safeMonthStats = monthStats ?? []

  const calculateTrend = () => {
    if (safeMonthStats.length < 2) return null
    const current =safeMonthStats[safeMonthStats.length - 1]?.count || 0
    const previous = safeMonthStats[safeMonthStats.length - 2]?.count || 0
    if (previous === 0) return null
    const change = Math.round(((current - previous) / previous) * 100)
    return change > 0 ? `+${change}%` : `${change}%`
  }

  if (isLoading) return <LoadingDots />

  if (error) return <p>error</p>
  return (
    <div className='w-full max-w-400 rounded-xl bg-white p-4 '>
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
        Job Application Stats
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatsCard
          title='Total Applications'
          value={stats.total}
          icon={<Briefcase className='w-6 h-6' />}
          color='blue'
          trend={
            calculateTrend()
              ? `${calculateTrend()} from last month`
              : "Keep applying!"
          }
          onClick={() => navigate("/dashboard/jobs")}
        />
        <StatsCard
          title='Pending Review'
          value={stats.pending}
          icon={<Clock className='w-6 h-6' />}
          color='yellow'
          trend='Awaiting response'
          onClick={() => navigate("/dashboard/jobs")}
        />
        <StatsCard
          title='Interviews'
          value={stats.interview}
          icon={<Calendar className='w-6 h-6' />}
          color='purple'
          trend={stats.interview > 0 ? "Good luck! " : "No interviews yet"}
          onClick={() => navigate("/dashboard/jobs")}
        />
        <StatsCard
          title='Accepted'
          value={stats.accepted}
          icon={<CheckCircle2 className='w-6 h-6' />}
          color='green'
          trend={stats.accepted > 0 ? "Congratulations! " : "Keep going!"}
          onClick={() => navigate("/dashboard/jobs")}
        />
      </div>
      <div className='bg-white rounded-xl shadow-sm p-6 mb-8'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          Application Timeline
        </h3>
        {safeMonthStats && safeMonthStats.length > 0 ? (
          <StatsChart stats={safeMonthStats} />
        ) : (
          <div className='flex items-center justify-center h-64 text-gray-500'>
            No data available yet. Start applying to see your trends!
          </div>
        )}
      </div>

      {safeMonthStats.length > 0 && (
        <div className='bg-linear-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <TrendingUp className='w-5 h-5 text-indigo-600' />
            <h2 className='text-lg font-bold text-gray-800'>
              Application Trend
            </h2>
          </div>
          <div className='space-y-3'>
            {safeMonthStats.map((month:MonthStat, index:number) => (
              <div key={index} className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-700'>
                  {month.date}
                </span>
                <div className='flex items-center gap-2'>
                  <div className='w-24 bg-white rounded-full h-2 overflow-hidden'>
                    <div
                      className='bg-indigo-600 h-full rounded-full transition-all'
                      style={{
                        width: `${Math.min((month.count / Math.max(...monthStats.map((m) => m.count))) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className='text-sm font-bold text-indigo-600 w-8 text-right'>
                    {month.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Stats
