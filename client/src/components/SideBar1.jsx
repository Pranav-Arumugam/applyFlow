import React, { useState } from "react"
import NavItem from "./NavItem"
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useCurrentUser, useLogout } from "../hooks/useAuth"

const SideBar1 = () => {
  const { data: user } = useCurrentUser()
  const { mutate: logout, isPending: isLoggingOut } = useLogout()
  const handleSignOut = () => {
    logout()
  }
  const [active, setActive] = useState(" ")
  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    { icon: <Briefcase size={20} />, label: "Jobs", to: "/dashboard/jobs" },
    {
      icon: <Calendar size={20} />,
      label: "Interviews",
      to: "/dashboard/interviews",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Analytics",
      to: "/dashboard/stats",
    },
    { icon: <User size={20} />, label: "Profile", to: "/dashboard/profile" },
  ]
  return (
    <div className=' sticky top-0 flex flex-col h-full bg-[#1333E7] w-56 px-4 py-6 z-50 '>
      <div className='px-4 mb-8'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center'>
            <Briefcase size={24} className='text-white' />
          </div>
          <h1 className='text-2xl font-bold text-white'>ApplyFlow</h1>
        </div>
        <p className='text-xs text-blue-100 mt-2 px-1'>Your career companion</p>
      </div>

      {/* Navigation Items */}
      <nav className='flex-1 overflow-y-auto'>
        <ul className='flex flex-col gap-1.5'>
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.to}
              onClick={() => setActive(item.label)}
              active={active === item.label}
            />
          ))}
        </ul>
      </nav>

      <div className='mb-4 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center'>
            <User size={20} className='text-white' />
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-semibold text-white truncate'>
              {user?.name}
              {user?.lastName}
            </p>
            <p className='text-xs text-blue-100 truncate'>{user?.email}</p>
          </div>
        </div>
      </div>

      <button
        className='flex items center gap-3 w-full px-4 py-2.5 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors font-medium'
        disabled={isLoggingOut}
        onClick={handleSignOut}
      >
        <i className='fas fa-sign-out-alt' />
        <span>{isLoggingOut ? "Logging Out" : "Logout"}</span>
      </button>
    </div>
  )
}

export default SideBar1
