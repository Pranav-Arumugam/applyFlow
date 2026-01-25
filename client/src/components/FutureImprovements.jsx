import React from "react"
import { Rocket, BriefcaseBusiness, Zap, ArrowRight } from "lucide-react"

const FutureImprovements = () => {
  return (
    <section
      id='future-improvements'
      className='py-20 bg-linear-to-br from-purple-50 via-white to-blue-50'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='ml-0  lg:ml-26 mb-12'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4'>
            <Rocket className='w-4 h-4' />
            Coming Soon
          </div>
          <h2 className='text-3xl md:text-3xl font-bold text-gray-900 mb-4'>
            Future <span className='text-blue-600'>Improvements</span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl '>
            I'm actively working on making ApplyFlow even more powerful and
            seamless
          </p>
        </div>

        <div className='max-w-4xl mx-auto'>
          <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-purple-100'>
            <div className='flex items-start gap-6'>
              <div className='shrink-0'>
                <div className='w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg'>
                  <BriefcaseBusiness className='w-8 h-8 text-white' />
                </div>
              </div>

              <div className='flex-1 space-y-4'>
                <div>
                  <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
                    ApplyBuddy Browser Extension
                  </h3>
                  <div className='inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold'>
                    <Zap className='w-3 h-3' />
                    In Development
                  </div>
                </div>

                <p className='text-lg text-gray-700 leading-relaxed'>
                  Currently building a browser extension that automatically
                  collects job application data from popular job sites
                  (LinkedIn, Indeed, Glassdoor, etc.) and sends it directly to
                  ApplyFlow.
                </p>

                <div className='space-y-3'>
                  <p className='text-gray-600 font-semibold'>
                    This will enable:
                  </p>
                  <ul className='space-y-2'>
                    <li className='flex items-start gap-3 text-gray-700'>
                      <ArrowRight className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
                      <span>
                        One-click application logging from any job site
                      </span>
                    </li>
                    <li className='flex items-start gap-3 text-gray-700'>
                      <ArrowRight className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
                      <span>
                        Automatic extraction of job details, requirements, and
                        company info
                      </span>
                    </li>
                    <li className='flex items-start gap-3 text-gray-700'>
                      <ArrowRight className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
                      <span>Seamless sync with your ApplyFlow dashboard</span>
                    </li>
                    <li className='flex items-start gap-3 text-gray-700'>
                      <ArrowRight className='w-5 h-5 text-blue-600 shrink-0 mt-0.5' />
                      <span>
                        No more manual data entry or context switching
                      </span>
                    </li>
                  </ul>
                </div>

                <div className='pt-4 border-t border-gray-200'>
                  <p className='text-sm text-gray-500 italic'>
                    The extension will make application logging effortless,
                    letting you focus on preparing for interviews instead of
                    managing spreadsheets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FutureImprovements
