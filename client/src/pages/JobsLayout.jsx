import React, { useEffect, useState } from "react"
import JobCard from "../components/JobCard"
import JobRow from "../components/JobRow"
import JobsFilter from "../components/JobsFilter"
import LoadingDots from "../components/LoadingDots"
import { useGetAllJobs } from "../hooks/useJobs"
import { Link } from "react-router-dom"
import { Briefcase, Plus } from "lucide-react"

const JobsLayout = () => {
  // const handleViewJobDetails = (jobId) => {
  //   console.log("View details for job ID:", jobId)
  // }

  // const jobs = [
  //   {
  //     id: 1,
  //     company: "Google",
  //     title: "Frontend Developer",
  //     status: "Applied",
  //     match: 84,
  //     location: "London",
  //     added: "4 days ago",
  //     type: "Full-time",
  //   },
  //   {
  //     id: 2,
  //     company: "Meta",
  //     title: "React Developer",
  //     status: "Interviewing",
  //     match: 76,
  //     location: "Remote",
  //     added: "2 days ago",
  //     type: "Full-time",
  //   },
  // ]

  const [search, setSearch] = React.useState("")
  const [status, setStatus] = React.useState("all")
  const [type, setType] = React.useState("all")
  const [sort, setSort] = React.useState("newest")
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  //debounced Search
  const [debouncedSearch, setDebouncedSearch] = React.useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 2000)
    return () => clearTimeout(timer)
  })

  const filters = {
    search: debouncedSearch,
    status,
    type,
    sort,
    page,
    limit,
  }

  const { data, isLoading, error } = useGetAllJobs(filters)

  const jobs = data?.jobs || []
  const pagination = data?.pagination || {}

  // const filteredJobs = useMemo(() => {
  //   const term = search.toLowerCase().trim()

  //   return jobs.filter((job) => {
  //     const matchesSearch =
  //       !term ||
  //       job.position?.toLowerCase().includes(term) ||
  //       job.company?.toLowerCase().includes(term)

  //     const matchesStatus = status === "all" || job.jobStatus === status
  //     const matchesType = type === "all" || job.jobType === type
  //     const matchesLocation = location === "all" || job.jobLocation === location

  //     return matchesSearch && matchesStatus && matchesType && matchesLocation
  //   })
  // }, [jobs, search, status, type])

  // console.log({ search, status, type, location, filteredJobs })

  if (isLoading) {
    return <LoadingDots />
  }

  if (error) {
    return (
      <p className='p-4 text-sm text-gray-500'>
        {error?.response?.data?.msg || error?.message || "Failed to load jobs"}
      </p>
    )
  }
  if (
    !isLoading &&
    jobs.length === 0 &&
    !debouncedSearch &&
    status === "all" &&
    type === "all"
  ) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] px-4 text-center'>
        <Briefcase className='w-16 h-16 text-gray-300 mb-4' />
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          No jobs yet
        </h3>
        <p className='text-sm text-gray-600 mb-6'>
          Start tracking your job applications
        </p>
        <Link
          to='/dashboard/add-job'
          className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          <Plus className='w-5 h-5' />
          Add Your First Job
        </Link>
      </div>
    )
  }
  return (
    <div className='w-full space-y-6'>
      <main className='flex-1 bg-white rounded-lg  p-4 '>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='flex flex-col justify-between space-y-3'>
              <h1 className='text-3xl font-bold text-gray-900'>Jobs</h1>
              <p className='text-sm text-gray-600 mt-1'>
                Manage and track your job applications
              </p>
            </div>
            <Link
              to={"/dashboard/jobs/new"}
              className='flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm hover:shadow-md'
            >
              Add Job
            </Link>
          </div>
        </div>

        <JobsFilter
          search={search}
          status={status}
          type={type}
          sort={sort}
          debouncedSearch={debouncedSearch}
          length={jobs.length}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onTypeChange={setType}
          onSortChange={setSort}
          pagination={pagination}
        />

        <section className='mt-8 mx-auto w-full max-w-400 p-4'>
          <div className='hidden md:block rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden'>
            <table className='w-full text-left text-sm '>
              <thead className='border-b bg-gray-50 text-xs text-gray-500'>
                <tr>
                  <th className='px-4 py-3'>Job Title</th>
                  <th className='px-4 py-3'>Company</th>
                  <th className='px-4 py-3'>Status</th>
                  <th className='px-4 py-3'>Match</th>
                  <th className='px-4 py-3'>Location</th>
                  <th className='px-4 py-3'>Added</th>
                </tr>
              </thead>
              <tbody className='divide-zinc-50 divide-y'>
                {jobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className='px-6 py-12 text-center text-sm text-gray-500'
                    >
                      <div className='flex flex-col items-center'>
                        <Briefcase className='w-12 h-12 text-gray-300 mb-3' />
                        <p>No jobs match your filters.</p>
                        <button
                          onClick={() => {
                            setSearch("")
                            setStatus("all")
                            setType("all")
                          }}
                          className='mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium'
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => <JobRow key={job._id} job={job} />)
                )}
              </tbody>
            </table>
          </div>

          <div className='space-y-3 md:hidden'>
            {jobs.length === 0 ? (
              <p className='capitalize font-medium text-center text-lg'>
                no jobs match your fitlers
              </p>
            ) : (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            )}
            {}
          </div>
        </section>
        {pagination.totalPages > 1 && (
          <div className='flex items-center justify-between bg-white rounded-2xl border border-gray-200 p-4'>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.hasPrevPage}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Previous
            </button>

            <span className='text-sm text-gray-600'>
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNextPage}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default JobsLayout
