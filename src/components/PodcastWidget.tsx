import { motion } from 'motion/react'
import { Play, SkipForward, Volume2 } from 'lucide-react'

export default function PodcastWidget() {
  return (
    <div className="bg-white rounded-[16px] border border-border/50 overflow-hidden">
      <div className="bg-gradient-to-br from-sidebar to-primary-dark p-4 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
        <div className="relative z-10">
          <p className="text-[10px] text-white/50 uppercase tracking-wider font-medium mb-1">Podcast</p>
          <h4 className="text-sm font-bold text-white tracking-tight">C.Vale Cast</h4>
          <p className="text-xs text-white/70 mt-0.5">Ep. 42 — Inovação no campo</p>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="w-full h-1 bg-gray-100 rounded-full mb-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '35%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-secondary">12:45 / 36:20</span>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center text-white shadow-[var(--shadow-primary)]"
            >
              <Play className="w-3.5 h-3.5 ml-0.5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-[12px] hover:bg-gray-100 text-text-secondary transition-colors duration-[250ms]"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-[12px] hover:bg-gray-100 text-text-secondary transition-colors duration-[250ms]"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
