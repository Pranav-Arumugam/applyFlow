import React from "react"

const Navbar = () => {
  return (
    <nav className='bg-gray-200 h-20 justify-between px-4 py-2 items-center shadow-md hidden md:flex'>
      <div className='font-bold text-xl p-2 ml-7 uppercase'>
        <h1>Jobify</h1>
      </div>
      <div>search</div>
      <div className='flex justify-between gap-7'>
        <div>user icon</div>
        <div>add job</div>
      </div>
    </nav>
  )
}

export default Navbar
