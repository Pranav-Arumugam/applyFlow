import React from "react"
interface EventModalProps {
  open: boolean
  close: () => void
}
const EventModal = ({ open, close }) => {
  return (
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/40'></div>
      <div></div>
    </>
  )
}

export default EventModal
