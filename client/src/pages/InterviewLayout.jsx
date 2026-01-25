import React, { useState } from "react"
import InterviewCalendar from "../components/InterviewCalendar"
import CreateInModal from "../components/CreateInModal"
import { Plus } from "lucide-react"

const InterviewLayout = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [modalMode, setModalMode] = React.useState("create") // or "edit"
  const [selectedInterview, setSelectedInterview] = useState(null)

  const openCreateModal = () => {
    setSelectedInterview(null)
    setModalMode("create")
    setOpenModal(true)
  }

  const openEditModal = (interview) => {
    setSelectedInterview(interview)
    console.log("edit mode :", interview)
    setModalMode("edit")
    setOpenModal(true)
  }

  return (
    <div className='min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8'>
      {" "}
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Interviews</h1>
              <p className='text-sm text-gray-600 mt-1'>
                Manage and track your upcoming interviews
              </p>
            </div>
            <button
              className='flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm hover:shadow-md'
              onClick={openCreateModal}
            >
              <Plus size={18} />
              Add Interview
            </button>
          </div>
        </div>

        <div className='bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6'>
          <InterviewCalendar
            onAddInterview={openCreateModal}
            onEditRequest={openEditModal}
          />
        </div>

        <CreateInModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          mode={modalMode}
          initialValues={selectedInterview}
        />
      </div>
    </div>
  )
}

export default InterviewLayout
