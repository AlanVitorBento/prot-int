import { motion } from 'motion/react'
import { DollarSign, Wheat } from 'lucide-react'

export default function PrecoDiaWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-accent to-emerald-600 rounded-[16px] p-4 overflow-hidden"
    >
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full blur-xl" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-[12px] flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-white/70 uppercase tracking-wider font-medium">Preço do Dia</p>
            <p className="text-xs text-white/90 font-medium">Soja — Palotina/PR</p>
          </div>
        </div>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-2xl font-bold text-white tracking-tight">R$ 128,50</span>
          <span className="text-xs text-white/70 mb-1">/sc 60kg</span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-white/60">
          <span className="flex items-center gap-1">
            <Wheat className="w-3 h-3" />
            Atualizado às 08:30
          </span>
        </div>
      </div>
    </motion.div>
  )
}
