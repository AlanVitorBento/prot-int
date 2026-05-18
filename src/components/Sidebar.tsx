import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import {
  Home,
  Rss,
  Hash,
  Users,
  LayoutGrid,
  ShoppingBag,
  Settings,
  ChevronLeft,
  Wheat,
} from 'lucide-react'

const menuItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/feed', icon: Rss, label: 'Feed' },
  { to: '/canais', icon: Hash, label: 'Canais' },
  { to: '/pessoas', icon: Users, label: 'Pessoas' },
  { to: '/sistemas', icon: LayoutGrid, label: 'Sistemas' },
  { to: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  { to: '/config', icon: Settings, label: 'Configurações' },
]

export default function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={mobile ? { x: -280 } : false}
        animate={{ x: 0 }}
        exit={{ x: -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`
          ${mobile ? 'fixed left-0 top-0 z-50 h-full' : 'hidden lg:flex sticky top-0 h-screen'}
          ${collapsed && !mobile ? 'w-[72px]' : 'w-64'}
          flex-col bg-sidebar flex-shrink-0
          transition-[width] duration-300
        `}
      >
        {/* Logo C.Vale */}
        <div className={`flex items-center h-16 px-4 border-b border-white/10 ${collapsed && !mobile ? 'justify-center' : 'gap-3'}`}>
          <div className="w-9 h-9 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/30">
            <Wheat className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {(!collapsed || mobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap flex flex-col"
              >
                <span className="font-bold text-white text-lg leading-tight">C.Vale</span>
                <span className="text-[10px] text-accent-light font-medium tracking-wider uppercase">Somos Coop</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {menuItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 relative
                ${collapsed && !mobile ? 'justify-center' : ''}
                ${isActive
                  ? 'text-white bg-sidebar-active'
                  : 'text-white/60 hover:text-white hover:bg-sidebar-hover'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-sidebar-active rounded-xl"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  <motion.div
                    className="relative z-10 flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {(!collapsed || mobile) && <span>{item.label}</span>}
                  </motion.div>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Collapse */}
        {!mobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center h-12 border-t border-white/10 text-white/40 hover:text-white hover:bg-sidebar-hover transition-colors"
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.div>
          </button>
        )}

        <div className="absolute bottom-12 left-0 right-0 h-20 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
      </motion.aside>
    </>
  )
}
