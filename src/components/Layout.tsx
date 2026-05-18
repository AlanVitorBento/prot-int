import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'

export default function Layout() {
  return (
    <div className="h-screen flex flex-col bg-bg overflow-hidden">
      <Topbar />
      <main className="flex-1 p-4 lg:p-6 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
