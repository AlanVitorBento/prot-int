import { motion } from 'motion/react'
import { Search, Bell, LayoutGrid, Menu } from 'lucide-react'
import WeatherWidget from './WeatherWidget'

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-16 glass border-b border-border/50 flex items-center px-4 gap-4 sticky top-0 z-30"
    >
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-primary/10 text-text-secondary transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Buscar pessoas, canais, sistemas..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 rounded-xl border border-border/50 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white
              transition-all duration-300 placeholder:text-text-secondary"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Weather */}
        <WeatherWidget />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 rounded-xl hover:bg-primary/5 text-text-secondary relative transition-colors"
        >
          <LayoutGrid className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 rounded-xl hover:bg-primary/5 text-text-secondary relative transition-colors"
        >
          <Bell className="w-5 h-5" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
          />
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer ml-1 shadow-md shadow-primary/20"
        >
          AB
        </motion.div>
      </div>
    </motion.header>
  )
}
