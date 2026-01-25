import React from "react"

const JobsFilter = ({
  search,
  status,
  type,
  sort,
  length,
  debouncedSearch,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onSortChange,
  pagination,
}) => {
  const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Interview", value: "interview" },
    { label: "Accepted", value: "accepted" },
    { label: "Declined", value: "declined" },
  ]
  const typeOptions = [
    { label: "All Types", value: "all" },
    { label: "Full-Time", value: "full-time" },
    { label: "Part-Time", value: "part-time" },
    { label: "Internship", value: "internship" },
  ]
  const sortOption = [
    { label: "All", value: "all" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Match-Score", value: "score" },
  ]

  const handleClearFilters = () => {
    onSearchChange("")
    onStatusChange("all")
    onTypeChange("all")
    onSortChange("newest")
  }

  return (
    <section className='mt-4 rounded-xl bg-white shadow-lg border border-gray-100 px-3 py-6'>
      <div className='flex items-center justify-between mb-4 px-4'>
        <h1 className='text-2xl font-semibold'>Filter Jobs</h1>
        <button
          onClick={handleClearFilters}
          className='text-sm text-blue-600 hover:text-blue-700 font-medium'
        >
          Clear All
        </button>
      </div>
      <div className='mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-4'>
        <div className='w-full md:max-w-md'>
          <input
            type='text'
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder='Search jobs...'
            className='w-full px-4 py-2 border border-gray-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='flex flex-wrap gap-2 text-sm'>
          <select
            name=''
            id=''
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className='rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm'
          >
            {statusOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option === "all" ? "all Statuses" : option.label}
              </option>
            ))}
          </select>

          <select
            name=''
            id=''
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className='rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm'
          >
            {typeOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option === "all" ? "all Types" : option.label}
              </option>
            ))}
          </select>

          <select
            name=''
            id=''
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className='rounded-xl px-4 py-2 bg-white border border-gray-100 shadow-sm'
          >
            {sortOption.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='text-sm text-gray-500 mt-4'>
        <p>
          <span className='bg-blue-500 rounded-full p-2 w-3 h-3 text-white'>
            {pagination.totalJobs || 0}
          </span>{" "}
          total jobs{" "}
          {(debouncedSearch ||
            status !== "all" ||
            type !== "all" ||
            location !== "all") &&
            ` | Showing ${length} results.....`}
        </p>
      </div>
    </section>
  )
}

export default JobsFilter
