import React, { useState } from "react"
import SideBar from "../components/SideBar"
import { Outlet, useLocation } from "react-router-dom"
import SideBar1 from "../components/SideBar1"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import NavigationHeader from "../components/NavigationLink"
import {
  Menu,
  Home,
  Briefcase,
  Calendar,
  BarChart3,
  User,
  ChevronRight,
} from "lucide-react"

const DashboardLayout = () => {
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const toggleMobileSidebar = () => setMobileSidebar((prev) => !prev)

  const getPageInfo = () => {
    const path = location.pathname

    if (path === "/dashboard") {
      return {
        title: "Dashboard",
        icon: <Home size={24} />,
        breadcrumbs: ["Dashboard"],
        gradient: "from-blue-500 to-purple-500",
      }
    }
    if (path.includes("/dashboard/jobs")) {
      return {
        title: "Jobs",
        icon: <Briefcase size={24} />,
        breadcrumbs: ["Dashboard", "Jobs"],
        gradient: "from-green-500 to-teal-500",
      }
    }
    if (path.includes("/dashboard/interviews")) {
      return {
        title: "Interviews",
        icon: <Calendar size={24} />,
        breadcrumbs: ["Dashboard", "Interviews"],
        gradient: "from-purple-500 to-pink-500",
      }
    }
    if (path.includes("/dashboard/stats")) {
      return {
        title: "Analytics",
        icon: <BarChart3 size={24} />,
        breadcrumbs: ["Dashboard", "Analytics"],
        gradient: "from-orange-500 to-red-500",
      }
    }
    if (path.includes("/dashboard/profile")) {
      return {
        title: "Profile",
        icon: <User size={24} />,
        breadcrumbs: ["Dashboard", "Profile"],
        gradient: "from-indigo-500 to-blue-500",
      }
    }

    return {
      title: "Dashboard",
      icon: <Home size={24} />,
      breadcrumbs: ["Dashboard"],
      gradient: "from-blue-500 to-purple-500",
    }
  }

  const pageInfo = getPageInfo()

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <aside className='hidden md:block sticky left-0 top-0'>
        <SideBar1 />
      </aside>

      {
        <div
          className={`fixed inset-0 z-50 md:hidden flex transition-opacity duration-300 ${
            mobileSidebar
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className='flex-1 inset-0 bg-black/40'
            onClick={toggleMobileSidebar}
          />
          <div
            className={`w-64 h-full bg-[#1333E7] shadow-lg rounded-xl z-50 transform transition-transform duration-300
            ${mobileSidebar ? "translate-x-0" : "translate-x-full"}
          `}
          >
            <SideBar1 />
          </div>
        </div>
      }

      <main className='flex-1 bg-gray-100 rounded-lg '>
        <div className='w-full max-w-400 mx-auto p-4'>
          {/* <div className='flex items-center justify-between md:hidden mb-4'>
            <button
              type='button'
              className='rounded border px-3 py-1 text-sm'
              onClick={toggleMobileSidebar}
            >
              Menu
            </button>
            <span className='text-lg font-bold text-gray-900'>
              {pageInfo.title}
            </span>
          </div> */}
          <NavigationHeader onMenuClick={toggleMobileSidebar} />
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
