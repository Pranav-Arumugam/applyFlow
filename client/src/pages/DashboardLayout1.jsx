import React from "react"
import SideBar from "../components/SideBar"

const DashboardLayout1 = () => {
  const [mobileSidebar, setMobileSidebar] = React.useState(false)
  const toggleMobileSidebar = () => {
    setMobileSidebar((prev) => !prev)
  }
  return (
    <div className='min-h-[calc(100vh-5rem)] flex'>
      {/* sideBar Desktop */}
      <aside className='hidden md:block'>
        <div className='sticky h-[calc(100vh-5rem)]'>
          <SideBar />
        </div>
      </aside>
      {/* sideBar for Mobile */}
      <div
        className={`fixed inset-0 h-[calc(100vh) z-50 flex flex-col md:hidden transition-opacity duration-300 ${
          mobileSidebar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* overlay with light black */}

        <div
          className={`w-full h-[calc(100vh-10rem)] bg-gray-200 rounded-l-xl transition-transform duration-300 z-50
          ${mobileSidebar ? "translate-y-0" : "-translate-y-full"}
        `}
        >
          <SideBar />
        </div>
        <div
          className={`inset-0 flex-1 bg-black/40 h-[calc(100vh/2)]`}
          onClick={toggleMobileSidebar}
        >
          <p className='text-sm text-gray-100 text-center pt-17 capitalize'>
            click to exit
          </p>
        </div>
      </div>
      <main className='flex-1 bg-red-500 p-4'>
        <div className='md:hidden flex items-center justify-between'>
          <button
            type='button'
            onClick={toggleMobileSidebar}
            className='border-2 border-white rounded px-3 py-1 m-2 text-white'
          >
            Menu
          </button>
          <p className='text-sm text-white'>DashboardLayout1</p>
        </div>
        DashboardLayout
      </main>
    </div>
  )
}

export default DashboardLayout1
