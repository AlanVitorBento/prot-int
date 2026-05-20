import { motion } from 'motion/react'
import { Sparkles, Sun, Moon, CloudSun } from 'lucide-react'

function getGreeting(): { text: string; icon: typeof Sun } {
  const hour = new Date().getHours()
  if (hour < 12) return { text: 'Bom dia', icon: Sun }
  if (hour < 18) return { text: 'Boa tarde', icon: CloudSun }
  return { text: 'Boa noite', icon: Moon }
}

function getWeekday(): string {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function GreetingHeader() {
  const { text, icon: TimeIcon } = getGreeting()
  const dateStr = getWeekday()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-center justify-between mb-6"
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', damping: 15 }}
          className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center"
        >
          <TimeIcon className="w-5 h-5 text-amber-600" />
        </motion.div>
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl font-bold text-text tracking-tight"
          >
            {text}, <span className="text-primary">colaborador</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-text-secondary capitalize"
          >
            {dateStr}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent-dark"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span className="text-xs font-semibold">Somos Coop</span>
      </motion.div>
    </motion.div>
  )
}
