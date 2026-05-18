import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg">
      <Topbar />
      <main className="p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  )
}
