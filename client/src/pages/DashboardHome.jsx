import React from "react"
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "../hooks/useAuth"
import { useGetStats } from "../hooks/useJobs"
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  Bell,
  Target,
} from "lucide-react"
import { formatDate } from "../utils/textFormatting"
import LoadingDots from "../components/LoadingDots"

const DashboardHome = () => {
  const navigate = useNavigate()
  const { data: user, isLoading: userLoading } = useCurrentUser()
  const { data: statsData, isLoading: statsLoading } = useGetStats()

  const stats = statsData?.defaultStatus || {
    total: 0,
    pending: 0,
    interview: 0,
    accepted: 0,
    rejected: 0,
  }
  console.log(stats)

  const recentApplications = statsData?.recentApplications || []
  const monthStats = statsData?.monthStats || []

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "interview":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200"
      case "declined":
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString)
  //   const today = new Date()
  //   const tomorrow = new Date(today)
  //   tomorrow.setDate(tomorrow.getDate() + 1)

  //   if (date.toDateString() === today.toDateString()) return "Today"
  //   if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow"

  //   return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  // }

  const calculateTrend = () => {
    if (monthStats.length < 2) return null
    const current = monthStats[monthStats.length - 1]?.count || 0
    const previous = monthStats[monthStats.length - 2]?.count || 0
    if (previous === 0) return null
    const change = (((current - previous) / previous) * 100).toFixed(0)
    return change > 0 ? `+${change}%` : `${change}%`
  }

  if (userLoading || statsLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='text-center'>
          <LoadingDots />
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>
              Welcome back, {user?.name}!{" "}
            </h1>
            <p className='text-blue-100 text-lg'>
              {stats.pending > 0
                ? `You have ${stats.pending} pending application${stats.pending !== 1 ? "s" : ""}`
                : "No pending applications"}
              {stats.interview > 0 &&
                ` and ${stats.interview} interview${stats.interview !== 1 ? "s" : ""} scheduled`}
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/jobs/new")}
            className='mt-4 md:mt-0 bg-white cursor-pointer text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl'
          >
            <Plus className='w-5 h-5' />
            Add New Application
          </button>
        </div>
      </div>

      {/* Stats Cards */}
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

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Recent Applications */}
        <div className='lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-2'>
              <Briefcase className='w-5 h-5 text-blue-600' />
              <h2 className='text-xl font-bold text-gray-800'>
                Recent Applications
              </h2>
            </div>
            <button
              onClick={() => navigate("/dashboard/jobs")}
              className='text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1'
            >
              View All
              <ArrowRight className='w-4 h-4' />
            </button>
          </div>

          <div className='space-y-3'>
            {recentApplications.length === 0 ? (
              <div className='text-center py-12 text-gray-500'>
                <Briefcase className='w-16 h-16 mx-auto mb-4 text-gray-300' />
                <p className='text-lg font-medium mb-2'>No applications yet</p>
                <p className='text-sm mb-4'>
                  Start tracking your job applications
                </p>
                <button
                  onClick={() => navigate("/dashboard/jobs/new")}
                  className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2'
                >
                  <Plus className='w-4 h-4' />
                  Add Your First Job
                </button>
              </div>
            ) : (
              recentApplications.map((job) => (
                <div
                  key={job._id}
                  className='border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer hover:border-blue-200'
                  onClick={() => navigate(`/dashboard/jobs/${job._id}`)}
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-start gap-3'>
                        <div className='w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0'>
                          {job.company?.charAt(0).toUpperCase()}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-semibold text-gray-900 mb-1 truncate'>
                            {job.position}
                          </h3>
                          <p className='text-sm text-gray-600 mb-2'>
                            {job.company}
                          </p>
                          <div className='flex flex-wrap items-center gap-2 text-xs text-gray-500'>
                            <span className='flex items-center gap-1'>
                              <Calendar className='w-3 h-3' />
                              {formatDate(job.createdAt)}
                            </span>
                            {job.jobType && (
                              <span className='px-2 py-0.5 bg-gray-100 rounded-full'>
                                {job.jobType}
                              </span>
                            )}
                            {job.matchScore !== undefined && (
                              <span className='flex items-center gap-1'>
                                <Target className='w-3 h-3' />
                                {job.matchScore}% match
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(job.jobStatus)}`}
                    >
                      {job.jobStatus?.charAt(0).toUpperCase() +
                        job.jobStatus?.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='space-y-6'>
          {/* Quick Actions */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>
              Quick Actions
            </h2>
            <div className='space-y-3'>
              <button
                onClick={() => navigate("/dashboard/jobs/new")}
                className='w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-left transition-colors border border-gray-200 hover:border-blue-300'
              >
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Plus className='w-5 h-5 text-blue-600' />
                </div>
                <div>
                  <p className='font-medium text-gray-900'>Add Application</p>
                  <p className='text-xs text-gray-500'>Track a new job</p>
                </div>
              </button>

              <button
                onClick={() => navigate("/dashboard/jobs")}
                className='w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-left transition-colors border border-gray-200 hover:border-purple-300'
              >
                <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                  <Briefcase className='w-5 h-5 text-purple-600' />
                </div>
                <div>
                  <p className='font-medium text-gray-900'>View All Jobs</p>
                  <p className='text-xs text-gray-500'>See your applications</p>
                </div>
              </button>

              <button
                onClick={() => navigate("/dashboard/stats")}
                className='w-full flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-left transition-colors border border-gray-200 hover:border-green-300'
              >
                <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                  <TrendingUp className='w-5 h-5 text-green-600' />
                </div>
                <div>
                  <p className='font-medium text-gray-900'>View Analytics</p>
                  <p className='text-xs text-gray-500'>Track progress</p>
                </div>
              </button>
            </div>
          </div>

          <div className='bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6'>
            <div className='flex items-center gap-2 mb-3'>
              <Bell className='w-5 h-5 text-amber-600' />
              <h2 className='text-lg font-bold text-gray-800'>Keep Going!</h2>
            </div>
            <p className='text-sm text-gray-700 mb-3'>
              {stats.total === 0
                ? "Start your job search journey today!"
                : stats.total < 10
                  ? "You're building momentum! Keep applying to reach your goals."
                  : stats.accepted > 0
                    ? "Great work! You've got offers. Stay focused on your top choices."
                    : "Consistency is key! The right opportunity is out there."}
            </p>
            <div className='text-xs text-amber-700 bg-amber-100 rounded-lg p-3'>
              <strong>Tip:</strong> Follow up on applications after 1 week to
              show continued interest.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// StatsCard Component
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

export default DashboardHome
