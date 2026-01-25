import React from "react"
import {
  formatTextIntoParagraphs,
  isHeading,
  hasBulletPoints,
  extractBulletItems,
  calculateReadingTime,
  getWordCount,
} from "../utils/textFormatting"
import { FileText } from "lucide-react"

const JobDesc = ({ job }) => {
  if (!job?.jobDescription || job.jobDescription.trim().length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <AlertCircle className='w-12 h-12 text-gray-300 mb-3' />
        <p className='text-gray-500 font-medium'>
          No job description available
        </p>
        <p className='text-sm text-gray-400 mt-1'>
          Add a description to better track this position
        </p>
      </div>
    )
  }

  const paragraphs = formatTextIntoParagraphs(job.jobDescription)
  const wordCount = getWordCount(job.jobDescription)
  const readingTime = calculateReadingTime(job.jobDescription)
  return (
    <div className='bg-white rounded-xl shadow-sm p-4 border border-gray-100 space-y-6'>
      <div className='flex items-center gap-3 pb-4 border-b border-gray-200'>
        <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
          <FileText className='w-5 h-5 text-blue-600' />
        </div>
        <div>
          <h2 className='text-xl font-bold text-gray-900'>Job Description</h2>
          <p className='text-sm text-gray-500'>Details about this position</p>
        </div>
      </div>
      <div className='prose prose-gray max-w-none'>
        <div className='space-y-4 text-gray-700 leading-relaxed'>
          {paragraphs.map((paragraph, index) => {
            // Check if it's a heading
            if (isHeading(paragraph)) {
              return (
                <h3
                  key={index}
                  className='text-lg font-semibold text-gray-900 mt-6 mb-3 first:mt-0'
                >
                  {paragraph.replace(/:$/, "")}
                </h3>
              )
            }

            // Check if paragraph contains bullet points
            if (hasBulletPoints(paragraph)) {
              const items = extractBulletItems(paragraph)

              return (
                <ul
                  key={index}
                  className='list-disc list-inside space-y-2 ml-4'
                >
                  {items.map((item, i) => (
                    <li key={i} className='text-gray-700'>
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }

            // Regular paragraph
            return (
              <p key={index} className='text-base text-gray-700 leading-7'>
                {paragraph}
              </p>
            )
          })}
        </div>
      </div>
      {wordCount > 100 && (
        <div className='mt-6 pt-4 border-t border-gray-200'>
          <p className='text-xs text-gray-500'>
            {wordCount} words • {readingTime} min read
          </p>
        </div>
      )}
    </div>
  )
}

export default JobDesc
