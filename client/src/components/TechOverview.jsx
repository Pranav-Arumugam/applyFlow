import React from "react"
export const TechOverview = () => {
  return (
    <section id='tech-overview' className='bg-white py-20'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-10'>
          <h2 className='text-3xl md:text-4xl font-bold  text-gray-900 mb-3'>
            Tech <span className='text-blue-600'>Overview</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl'>
            The stack was chosen to stay simple, explicit, and easy to evolve as
            the system grows.
          </p>
        </div>

        <div className='grid  gap-6 md:grid-cols-2'>
          <div className='rounded-xl border border-gray-100 bg-gray-50 p-6'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Frontend
            </h3>
            <ul className='text-gray-600 space-y-1 text-sm'>
              <li>• React for UI and state driven views</li>
              <li>• React Router for application routing</li>
              <li>• Tailwind CSS for layout and styling</li>
            </ul>
          </div>

          <div className='rounded-xl border border-gray-100 bg-gray-50 p-6'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Backend
            </h3>
            <ul className='text-gray-600 space-y-1 text-sm'>
              <li>• Node.js with Express for the API layer</li>
              <li>• REST-based endpoints for jobs and interviews</li>
              <li>• Express Validator for request validation</li>
            </ul>
          </div>

          <div className='rounded-xl border border-gray-100 bg-gray-50 p-6'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Database
            </h3>
            <ul className='text-gray-600 space-y-1 text-sm'>
              <li>• MongoDB for flexible document storage</li>
              <li>• Mongoose for schema modeling and queries</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
