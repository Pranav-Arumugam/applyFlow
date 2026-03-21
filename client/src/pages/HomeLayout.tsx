import { Outlet } from "react-router-dom"

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
