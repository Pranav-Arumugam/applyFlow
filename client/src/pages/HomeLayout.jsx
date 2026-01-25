import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"

const HomeLayout = () => {
  return (
    <div className='bg-gray-100 flex flex-col min-h-screen '>
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout
