import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Bell,
  Home,
  Rss,
  Layers,
  LayoutGrid,
  ShoppingBag,
  Wheat,
  Menu,
  X,
} from 'lucide-react'
import WeatherWidget from './WeatherWidget'
import { useWidgetPreferences } from '../contexts/WidgetPreferences'

const menuItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/feed', icon: Rss, label: 'Feed' },
  { to: '/areas', icon: Layers, label: 'Áreas' },
  { to: '/sistemas', icon: LayoutGrid, label: 'Sistemas' },
  { to: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
]

export default function Topbar() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const { widgets } = useWidgetPreferences()

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-sidebar sticky top-0 z-30"
      >
        {/* Top row */}
        <div className="flex items-center h-14 px-4 lg:px-6 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mr-4">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-[12px] flex items-center justify-center shadow-[var(--shadow-accent)]">
              <Wheat className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-white text-base leading-tight">C.Vale</span>
              <span className="text-[9px] text-accent-light font-medium tracking-wider uppercase">Somos Coop</span>
            </div>
          </div>

          {/* Nav - desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center gap-2 px-3 py-1.5 rounded-[12px] text-sm font-medium transition-all duration-[250ms] relative
                  ${isActive
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="topbar-active"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-light rounded-full"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {!widgets.weather && <WeatherWidget />}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-[12px] hover:bg-white/10 text-white/60 relative transition-colors duration-[250ms]"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-sidebar" />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center text-white text-xs font-semibold cursor-pointer ml-1"
            >
              AB
            </motion.div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white/60 transition-colors ml-1"
            >
              {mobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-2 flex flex-wrap gap-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenu(false)}
                    className={({ isActive }) => `
                      flex items-center gap-2 px-3 py-2 rounded-[12px] text-sm font-medium transition-all duration-[250ms]
                      ${isActive ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
