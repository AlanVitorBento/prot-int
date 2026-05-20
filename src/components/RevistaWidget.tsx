import { motion } from 'motion/react'
import { BookOpen, ArrowRight, Wheat } from 'lucide-react'

export default function RevistaWidget() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-[16px] border border-border/50 overflow-hidden cursor-pointer group transition-shadow duration-[250ms] hover:shadow-[var(--shadow-lg)]"
    >
      <div className="h-28 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(33,64,154,0.08),transparent_60%)]" />
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent/5 rounded-full blur-xl" />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-18 bg-white rounded-[12px] shadow-[var(--shadow-md)] flex items-center justify-center border border-border/30">
            <Wheat className="w-6 h-6 text-primary/30" />
          </div>
          <div>
            <p className="text-[10px] text-primary/50 uppercase tracking-wider font-medium">Edição 156</p>
            <p className="text-sm font-bold text-primary tracking-tight">Revista C.Vale</p>
            <p className="text-[10px] text-text-secondary">Maio/Junho 2026</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <BookOpen className="w-3.5 h-3.5" />
          Ler edição completa
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]" />
      </div>
    </motion.div>
  )
}
