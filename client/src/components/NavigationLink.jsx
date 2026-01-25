import React, { useRef, useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  HelpCircle,
  ArrowLeft,
  User,
  Menu,
  Home,
  Briefcase,
  Calendar,
  BarChart3,
  ChevronDown,
  UserCircle,
  LogOut,
} from "lucide-react"
import { useCurrentUser, useLogout } from "../hooks/useAuth"

const NavigationHeader = ({ onMenuClick, showBackButton = true }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const dropDownRef = useRef(null)

  const { data: user } = useCurrentUser()
  const { mutate: logout, isPending: isLoggingOut } = useLogout()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsDropDownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    paths.forEach((path, index) => {
      const routePath = "/" + paths.slice(0, index + 1).join("/")

      // Customize labels based on route segments
      let label = path.charAt(0).toUpperCase() + path.slice(1)

      // Replace IDs or special segments with meaningful names
      if (path.match(/^[0-9a-fA-F]{24}$/)) {
        // MongoDB ObjectId pattern - skip or use custom label
        return
      }

      breadcrumbs.push({
        label: label.replace(/-/g, " "),
        path: routePath,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Determine if we should show the back button
  const canGoBack =
    window.history.length > 1 && location.pathname !== "/dashboard"

  const handleBack = () => {
    if (canGoBack) {
      navigate(-1)
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className='flex items-center gap-3 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
      {/* Mobile Menu Button */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className='md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700'
          aria-label='Open menu'
        >
          <Menu size={20} />
        </button>
      )}

      {/* Back Button */}
      {showBackButton && canGoBack && (
        <button
          onClick={handleBack}
          className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700'
          aria-label='Go back'
        >
          <ArrowLeft size={20} />
        </button>
      )}

      {/* Breadcrumbs */}
      <nav className='flex items-center gap-2 text-sm flex-1 overflow-x-auto'>
        <Link
          to='/dashboard'
          className='flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap'
        >
          <Home size={16} />
          <span className='hidden sm:inline'>Home</span>
        </Link>

        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            <span className='text-gray-400'>›</span>
            {index === breadcrumbs.length - 1 ? (
              <span className='font-semibold text-gray-900 whitespace-nowrap'>
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className='text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap'
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Right Side Actions */}
      <div className='flex gap-2 ml-auto'>
        <button
          className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700'
          aria-label='Help'
          title='Help'
        >
          <HelpCircle size={20} />
        </button>
        <div className=' relative' ref={dropDownRef}>
          {" "}
          <button
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 flex items-center gap-1'
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            aria-label='User menu'
            title='User menu'
          >
            <User size={20} />
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${isDropDownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isDropDownOpen && (
            <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
              <div className='px-4 py-3 border-b border-gray-200 flex gap-4 items-center'>
                <div className='w-10 h-10 rounded-full bg-linear-to-br from blue-200 to-purple-200 flex items-center justify-center'>
                  <span className='text-sm font-bold text-indigo-600'>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-900'>
                    {user?.name} {user?.lastName}
                  </p>
                  <p className='text-xs text-blue-600'>{user?.email}</p>
                </div>
              </div>
              <div className='py-1'>
                <Link
                  to='/dashboard/profile'
                  onClick={() => setIsDropDownOpen(false)}
                  className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                >
                  <UserCircle size={18} />
                  <span>My Profile</span>
                </Link>
              </div>
              <div className='border-t border-gray-200 pt-1'>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className='flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left '
                >
                  <LogOut size={18} />
                  <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavigationHeader
