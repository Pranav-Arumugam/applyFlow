import React from "react"

const BuildReason = () => {
  return (
    <section
      id='why-i-built-it'
      className='bg-lineaer-to-br from-gray-50 to-blue-50 py-20'
    >
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className=' mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4 capitalize'>
            Why I <span className='text-blue-700'>built</span> it
          </h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-2xl '>
            I was applying to multiple roles and my tracking was scattered
            across tabs, notes, and reminders. I built this to turn the process
            into one system.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Control
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              I wanted a single place to track every application with a clear
              status, next action, and history of updates.
            </p>
          </div>

          <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Interview visibility
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              I needed the timeline to be obvious: what's coming up, what
              changed, and what I should prepare for next.
            </p>
          </div>

          <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Skill alignment
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              I wanted to compare job requirements against my skills so I could
              prioritize roles and target what to improve.
            </p>
          </div>
        </div>

        <div className='mt-10 text-center'>
          <p className='text-sm text-gray-500'>
            Built as a personal tool, published publicly to show my approach to
            building real systems.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BuildReason
