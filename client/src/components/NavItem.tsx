import React from "react"
interface NavItemProps {
  icon: React.ReactNode
  label: string
  to?: string
  active?: boolean
  onClick?: () => void
}
const NavItem = ({ icon, label, to = "#", active = false }: NavItemProps) => {
  return (
    <li>
      <a
        href={to}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-white ${
          active ? "bg-[#2f4be7]" : "hover:bg-[#2f4be7]"
        }`}
      >
        {icon}
        <span className='text-sm'>{label}</span>
      </a>
    </li>
  )
}

export default NavItem
