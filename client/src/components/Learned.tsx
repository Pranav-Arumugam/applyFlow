import React from "react"

const Learned = () => {
  return (
    <section id='what-i-learned' className='bg-gray-50 py-20'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
            What I <span className='text-blue-600'> learned</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl'>
            Building this as a real, evolving system surfaced problems that
            don’t appear in small demo projects.
          </p>
        </div>

        <div className='space-y-6'>
          <div className='rounded-xl border border-gray-100 bg-white p-6'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Designing state-driven workflows
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              I learned how to model real-world processes like applications and
              interviews as explicit states, rather than scattered UI flags.
              This made transitions clearer and reduced edge cases.
            </p>
          </div>

          <div className='rounded-xl border border-gray-100 bg-white p-6'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Managing async data without coupling UI to requests
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Using React Query helped separate data fetching from rendering
              logic. I learned when to invalidate queries, when to reuse cached
              data, and when to refetch for correctness.
            </p>
          </div>

          <div className='rounded-xl border border-gray-100 bg-white p-6'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Handling time and calendars correctly
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Working with interviews and scheduling forced me to deal with
              timezones, date formats, and calendar state carefully. Small
              assumptions around time handling can easily break real systems.
            </p>
          </div>

          <div className='rounded-xl border border-gray-100 bg-white p-6'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              API design that evolves with features
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              As the project grew, I learned to design endpoints that could
              change without breaking the frontend, and to validate data
              consistently at the API boundary.
            </p>
          </div>

          <div className='rounded-xl border border-gray-100 bg-white p-6'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Building for maintainability, not just completion
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              This project reinforced the value of clear naming, predictable
              data shapes, and removing unnecessary abstractions early before
              they turn into long-term complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Learned
