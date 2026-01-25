import React from "react"
import { X } from "lucide-react"
import InterviewForm from "./InterviewForm"
const CreateInModal = ({ open, onClose, mode, initialValues }) => {
  const title = mode === "create" ? "Create Interview" : "Edit Interview"
  return (
    open && (
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        {/* BackDrop*/}
        <button className='absolute inset-0 bg-black/40' onClick={onClose} />
        {/* Modal */}
        <div className='relative z-10 w-[92%] max-w-xl bg-white rounded-2xl border border-gray-100 shadow-xl p-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h2 className='text-2xl font-bold'>{title}</h2>
              <p></p>
            </div>
            <button
              onClick={onClose}
              className='p-2 rounded-full hover:bg-gray-200'
            >
              <X size={20} />
            </button>
          </div>
          {/* Body */}
          <div>
            <InterviewForm
              mode={mode}
              initialValues={initialValues}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    )
  )
}

export default CreateInModal
