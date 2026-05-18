import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout() {
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      {mobileMenu && <Sidebar mobile onClose={() => setMobileMenu(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setMobileMenu(true)} />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
