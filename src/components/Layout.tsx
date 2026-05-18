import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
import { WidgetPreferencesProvider } from '../contexts/WidgetPreferences'

export default function Layout() {
  return (
    <WidgetPreferencesProvider>
    <div className="min-h-screen flex flex-col bg-bg relative">
      {/* Subtle ambient background shapes */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.02] rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse,rgba(33,64,154,0.01)_0%,transparent_70%)]" />
      </div>
      <Topbar />
      <main className="flex-1 p-4 lg:p-6 relative">
        <Outlet />
      </main>
    </div>
    </WidgetPreferencesProvider>
  )
}
